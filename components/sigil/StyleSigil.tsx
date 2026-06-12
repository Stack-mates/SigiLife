"use client";

/**
 * StyleSigil — name, ring, glow, and local save.
 * STATUS: implemented (lean local version — see scope note)
 *
 * SCOPE (ADR-009): no auth/DB yet, so "save" = keep the finished draft in
 * localStorage + offer a PNG download. Ring/glow are stored as style
 * metadata and previewed with CSS; baking them into the final image (and
 * recolor-all) lands with the real save pipeline. Recoloring is available
 * in the editor via select-all + color.
 *
 * @see docs/features/make-sigil.md
 */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMakeSigil } from "@/context/MakeSigilProvider";

const FINISHED_KEY = "sigilife:finished-sigils";

export function StyleSigil() {
  const router = useRouter();
  const { draft, setStyle, setName, reset, canStyle } = useMakeSigil();
  const [saved, setSaved] = useState(false);

  if (!canStyle) {
    // Step guard: nothing drawn yet.
    if (typeof window !== "undefined") router.replace("/make-sigil/draw");
    return null;
  }

  const finishLocally = () => {
    try {
      const existing = JSON.parse(localStorage.getItem(FINISHED_KEY) ?? "[]");
      existing.push({
        name: draft.name || "Unnamed sigil",
        intention: draft.intention,
        style: draft.style,
        canvasJson: draft.canvasJson,
        imageDataUrl: draft.imageDataUrl,
        finishedAt: new Date().toISOString(),
      });
      localStorage.setItem(FINISHED_KEY, JSON.stringify(existing));
      setSaved(true);
    } catch {
      // storage full — the download button still works
      setSaved(true);
    }
  };

  const downloadPng = () => {
    if (!draft.imageDataUrl) return;
    const a = document.createElement("a");
    a.href = draft.imageDataUrl;
    a.download = `${draft.name || "sigil"}.png`;
    a.click();
  };

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 pb-12">
      <header className="text-center">
        <h1 className="font-serif text-3xl text-zinc-50">Seal your sigil</h1>
        <p className="mt-2 text-sm text-zinc-400">Name it. Dress it. Keep it.</p>
      </header>

      <div className="relative mx-auto aspect-square w-72">
        {draft.style.ring && (
          <div className="pointer-events-none absolute inset-2 rounded-full border-2 border-current opacity-70"
            style={{ color: draft.style.color }} aria-hidden />
        )}
        {draft.imageDataUrl && (
          // eslint-disable-next-line @next/next/no-img-element -- data URL preview; next/image adds nothing here
          <img
            src={draft.imageDataUrl}
            alt="Your sigil"
            className="size-full rounded-2xl border border-zinc-800 bg-zinc-900 object-contain"
            style={draft.style.glow ? { filter: `drop-shadow(0 0 18px ${draft.style.color})` } : undefined}
          />
        )}
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
        <input
          type="text"
          value={draft.name}
          onChange={(e) => setName(e.target.value.slice(0, 100))}
          placeholder="Name your sigil…"
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:border-violet-600 focus:outline-none"
        />
        <div className="flex items-center justify-center gap-6 text-sm text-zinc-300">
          <label className="flex cursor-pointer items-center gap-2">
            <input type="checkbox" checked={draft.style.ring}
              onChange={(e) => setStyle({ ring: e.target.checked })} className="accent-violet-500" />
            Ring
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input type="checkbox" checked={draft.style.glow}
              onChange={(e) => setStyle({ glow: e.target.checked })} className="accent-violet-500" />
            Glow
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            Aura
            <input type="color" value={draft.style.color}
              onChange={(e) => setStyle({ color: e.target.value })}
              className="size-7 cursor-pointer rounded border-0 bg-transparent" aria-label="Ring and glow color" />
          </label>
        </div>
      </div>

      {saved ? (
        <div className="flex flex-col items-center gap-3">
          <p className="text-center text-sm text-violet-300">
            Kept on this device. Account sync arrives with the auth milestone —
            your sigil will migrate to your grimoire.
          </p>
          <button type="button" onClick={() => { reset(); router.push("/make-sigil/write"); }}
            className="rounded-full border border-zinc-700 px-6 py-2.5 text-zinc-300 transition hover:border-zinc-500">
            Craft another
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-3">
          <button type="button" onClick={downloadPng}
            className="rounded-full border border-zinc-700 px-6 py-2.5 text-zinc-300 transition hover:border-zinc-500">
            Download PNG
          </button>
          <button type="button" onClick={finishLocally}
            className="rounded-full bg-violet-600 px-8 py-2.5 font-medium text-white transition hover:bg-violet-500">
            Keep this sigil
          </button>
        </div>
      )}
    </div>
  );
}
