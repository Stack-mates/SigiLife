"use client";

/**
 * DrawSigilCanvas — the single-canvas sigil editor.
 * STATUS: implemented
 *
 * One canvas, one toolbar — no separate draw/manipulate modes (2026-06-12
 * decision, supersedes v1's two-mode design):
 * - Select tool: move/scale/rotate anything (letterforms and drawn strokes)
 * - Pen tool: freehand drawing (PencilBrush), color + width controls
 * - Undo/redo (snapshot history), delete selection, clear-and-reseed
 * Letterforms arrive as TRUE VECTOR PATHS traced from the sigil font
 * (POST /api/vectors → fabric.Path), so they scale/warp losslessly.
 * Color in select mode recolors the selection; in pen mode it sets the brush.
 *
 * Fabric is dynamically imported on mount — never in a server bundle.
 * Exports canvas JSON + PNG into MakeSigilProvider on "Continue".
 *
 * @see docs/features/make-sigil.md
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useMakeSigil } from "@/context/MakeSigilProvider";
import { seedLayout } from "@/lib/sigil/vectorSeed";
import type { Canvas } from "fabric";

type FabricModule = typeof import("fabric");
type Tool = "select" | "pen";

/** Logical canvas space — all object coordinates live in this square. */
const LOGICAL_SIZE = 600;
const GLYPH_COLOR = "#e8e3d8";

export function DrawSigilCanvas() {
  const router = useRouter();
  const { draft, characters, setCanvas: saveDraftCanvas } = useMakeSigil();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasElRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<FabricModule | null>(null);
  const canvasRef = useRef<Canvas | null>(null);

  // History: array of canvas JSON strings + pointer. `recording` is false
  // while we mutate programmatically (seed/undo/redo/restore).
  const historyRef = useRef<string[]>([]);
  const historyIndexRef = useRef(-1);
  const recordingRef = useRef(false);

  const [tool, setTool] = useState<Tool>("select");
  const [color, setColor] = useState(GLYPH_COLOR);
  const [brushWidth, setBrushWidth] = useState(4);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [missing, setMissing] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  const record = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !recordingRef.current) return;
    const json = JSON.stringify(canvas.toJSON());
    const history = historyRef.current.slice(0, historyIndexRef.current + 1);
    history.push(json);
    historyRef.current = history;
    historyIndexRef.current = history.length - 1;
    setCanUndo(historyIndexRef.current > 0);
    setCanRedo(false);
  }, []);

  const loadHistoryState = useCallback(async (index: number) => {
    const canvas = canvasRef.current;
    const json = historyRef.current[index];
    if (!canvas || json === undefined) return;
    recordingRef.current = false;
    await canvas.loadFromJSON(JSON.parse(json));
    canvas.renderAll();
    recordingRef.current = true;
    historyIndexRef.current = index;
    setCanUndo(index > 0);
    setCanRedo(index < historyRef.current.length - 1);
  }, []);

  const seedLetterforms = useCallback(async (canvas: Canvas, fabric: FabricModule) => {
    const res = await fetch("/api/vectors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ characters }),
    });
    const payload = await res.json();
    if (!res.ok) throw new Error(payload?.error?.message ?? "vector tracing failed");

    const { glyphs, missing: missingChars } = payload.data as {
      glyphs: { character: string; pathData: string; height: number }[];
      missing: string[];
    };
    setMissing(missingChars);

    const placements = seedLayout(glyphs.length, LOGICAL_SIZE, glyphs[0]?.height ?? 120);
    glyphs.forEach((glyph, i) => {
      const p = placements[i];
      const path = new fabric.Path(glyph.pathData, {
        fill: GLYPH_COLOR,
        stroke: undefined,
        originX: "center",
        originY: "center",
        left: p.x,
        top: p.y,
        scaleX: p.scale,
        scaleY: p.scale,
        angle: p.angle,
      });
      canvas.add(path);
    });
    canvas.renderAll();
  }, [characters]);

  // Init once: load fabric, build canvas, restore draft or seed letterforms.
  useEffect(() => {
    if (characters.length === 0) {
      router.replace("/make-sigil/write");
      return;
    }

    let disposed = false;

    (async () => {
      const fabric = await import("fabric");
      if (disposed || !canvasElRef.current) return;
      fabricRef.current = fabric;

      const canvas = new fabric.Canvas(canvasElRef.current, {
        selection: true,
        preserveObjectStacking: true,
      });
      canvasRef.current = canvas;

      const brush = new fabric.PencilBrush(canvas);
      brush.color = color;
      brush.width = brushWidth;
      brush.strokeLineCap = "round";
      brush.strokeLineJoin = "round";
      canvas.freeDrawingBrush = brush;

      // Responsive: logical 600-space, zoomed to fit the wrapper.
      const fit = () => {
        const w = wrapperRef.current?.clientWidth ?? LOGICAL_SIZE;
        canvas.setDimensions({ width: w, height: w });
        canvas.setZoom(w / LOGICAL_SIZE);
      };
      fit();
      const observer = new ResizeObserver(fit);
      if (wrapperRef.current) observer.observe(wrapperRef.current);
      (canvas as unknown as { __resizeObserver?: ResizeObserver }).__resizeObserver = observer;

      if (draft.canvasJson) {
        await canvas.loadFromJSON(draft.canvasJson);
        canvas.renderAll();
      } else {
        await seedLetterforms(canvas, fabric);
      }

      // Record the initial state, then start listening.
      recordingRef.current = true;
      record();
      canvas.on("path:created", record);
      canvas.on("object:modified", record);
      canvas.on("object:removed", () => {
        // batch-removals call record() themselves; this catches singles
        if (recordingRef.current) record();
      });

      setReady(true);
    })();

    return () => {
      disposed = true;
      const canvas = canvasRef.current;
      if (canvas) {
        (canvas as unknown as { __resizeObserver?: ResizeObserver }).__resizeObserver?.disconnect();
        canvas.dispose();
        canvasRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- init-once; tool/color/width updates are handled in their own effects
  }, []);

  // Tool switching.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.isDrawingMode = tool === "pen";
    canvas.selection = tool === "select";
    canvas.defaultCursor = tool === "pen" ? "crosshair" : "default";
  }, [tool, ready]);

  // Brush settings + recolor selection in select mode.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = color;
      canvas.freeDrawingBrush.width = brushWidth;
    }
  }, [color, brushWidth, ready]);

  const applyColorToSelection = useCallback(
    (next: string) => {
      const canvas = canvasRef.current;
      if (!canvas || tool !== "select") return;
      const active = canvas.getActiveObjects();
      if (active.length === 0) return;
      for (const obj of active) {
        // Pen strokes are stroked paths; letterforms are filled paths.
        if (obj.stroke) obj.set({ stroke: next });
        else obj.set({ fill: next });
      }
      canvas.renderAll();
      record();
    },
    [tool, record],
  );

  const handleColorChange = (next: string) => {
    setColor(next);
    applyColorToSelection(next);
  };

  const undo = () => {
    if (historyIndexRef.current > 0) void loadHistoryState(historyIndexRef.current - 1);
  };
  const redo = () => {
    if (historyIndexRef.current < historyRef.current.length - 1)
      void loadHistoryState(historyIndexRef.current + 1);
  };

  const deleteSelection = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const active = canvas.getActiveObjects();
    if (active.length === 0) return;
    recordingRef.current = false;
    for (const obj of active) canvas.remove(obj);
    canvas.discardActiveObject();
    canvas.renderAll();
    recordingRef.current = true;
    record();
  };

  const clearAndReseed = async () => {
    const canvas = canvasRef.current;
    const fabric = fabricRef.current;
    if (!canvas || !fabric) return;
    recordingRef.current = false;
    canvas.clear();
    await seedLetterforms(canvas, fabric);
    recordingRef.current = true;
    record();
  };

  const continueToStyle = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.discardActiveObject();
    canvas.renderAll();
    saveDraftCanvas(
      canvas.toJSON(),
      canvas.toDataURL({ format: "png", multiplier: 2 }),
    );
    router.push("/make-sigil/style");
  };

  const toolButton = (t: Tool, label: string, icon: React.ReactNode) => (
    <button
      type="button"
      aria-label={label}
      aria-pressed={tool === t}
      title={label}
      onClick={() => setTool(t)}
      className={
        "grid size-10 place-items-center rounded-xl transition " +
        (tool === t ? "bg-violet-600 text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100")
      }
    >
      {icon}
    </button>
  );

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-4 px-4 pb-12">
      <div className="flex items-center justify-center gap-1 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-2 backdrop-blur">
        {toolButton(
          "select",
          "Select & transform",
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
            <path d="M5 3l14 8-6.5 1.5L9 19z" />
          </svg>,
        )}
        {toolButton(
          "pen",
          "Draw",
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19l7-7 3 3-7 7-3-3z" />
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          </svg>,
        )}

        <span className="mx-1 h-6 w-px bg-zinc-800" aria-hidden />

        <label className="grid size-10 cursor-pointer place-items-center rounded-xl hover:bg-zinc-800" title="Color">
          <span className="size-5 rounded-full border border-zinc-600" style={{ backgroundColor: color }} />
          <input
            type="color"
            value={color}
            onChange={(e) => handleColorChange(e.target.value)}
            className="sr-only"
            aria-label="Stroke color"
          />
        </label>
        <input
          type="range"
          min={2}
          max={16}
          value={brushWidth}
          onChange={(e) => setBrushWidth(Number(e.target.value))}
          aria-label="Brush width"
          title="Brush width"
          className="w-20 accent-violet-500"
        />

        <span className="mx-1 h-6 w-px bg-zinc-800" aria-hidden />

        <button type="button" onClick={undo} disabled={!canUndo} aria-label="Undo" title="Undo"
          className="grid size-10 place-items-center rounded-xl text-zinc-400 transition enabled:hover:bg-zinc-800 enabled:hover:text-zinc-100 disabled:opacity-30">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 14L4 9l5-5" /><path d="M4 9h10a6 6 0 110 12h-3" />
          </svg>
        </button>
        <button type="button" onClick={redo} disabled={!canRedo} aria-label="Redo" title="Redo"
          className="grid size-10 place-items-center rounded-xl text-zinc-400 transition enabled:hover:bg-zinc-800 enabled:hover:text-zinc-100 disabled:opacity-30">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 14l5-5-5-5" /><path d="M20 9H10a6 6 0 100 12h3" />
          </svg>
        </button>

        <span className="mx-1 h-6 w-px bg-zinc-800" aria-hidden />

        <button type="button" onClick={deleteSelection} aria-label="Delete selection" title="Delete selection"
          className="grid size-10 place-items-center rounded-xl text-zinc-400 transition hover:bg-zinc-800 hover:text-red-400">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" />
          </svg>
        </button>
        <button type="button" onClick={() => void clearAndReseed()} aria-label="Clear and restore letters" title="Clear & restore letters"
          className="grid size-10 place-items-center rounded-xl text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 109-9" /><path d="M3 4v8h8" />
          </svg>
        </button>
      </div>

      {missing.length > 0 && (
        <p className="text-center text-xs text-amber-400/90">
          The sigil font has no shape for: {missing.join(" ")} — draw those by hand.
        </p>
      )}

      <div
        ref={wrapperRef}
        className="relative aspect-square w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-[inset_0_0_60px_rgba(0,0,0,0.5)]"
      >
        <canvas ref={canvasElRef} />
        {!ready && (
          <div className="absolute inset-0 grid place-items-center text-sm text-zinc-500">
            Tracing your letters…
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-zinc-500">
          {tool === "select" ? "Drag to move · corners to scale & rotate" : "Draw freely — every stroke stays editable"}
        </p>
        <button
          type="button"
          onClick={continueToStyle}
          disabled={!ready}
          className="rounded-full bg-violet-600 px-6 py-2.5 font-medium text-white transition enabled:hover:bg-violet-500 disabled:opacity-40"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
