"use client";

/**
 * DestroyRitual — orchestrates the destruction ceremony.
 * STATUS: implemented (persists to the database via lib/sigil/actions)
 *
 * Flow: in-fiction confirm (irreversible) → EmotionPicker → the <EvilEye>
 * watches, its pupil following the user's pointer/touch while a completion
 * meter fills → destroySigil(id) (status → DESTROYED) → routed to Closed
 * cases. Destruction is completion (GLOSSARY), framed as closing a case.
 * The done-state intentionally leaves room for the future "closed case file"
 * print offer (monetization).
 *
 * @see docs/features/charge-destroy.md
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { EvilEye } from "@/components/destroy/EvilEye";
import { EmotionPicker } from "@/components/charge/EmotionPicker";
import { destroySigil } from "@/lib/sigil/actions";
import type { SigilView } from "@/lib/sigil/types";
import { EMOTIONS, type EmotionKey } from "@/types";

type Phase = "confirm" | "pick" | "tracing";
const COMPLETION_TARGET = 100;

export function DestroyRitual({ sigil }: { sigil: SigilView }) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("confirm");
  const [emotion, setEmotion] = useState<EmotionKey | null>(null);
  const [progress, setProgress] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const activity = useRef(0);

  const bump = useCallback(() => {
    if (activity.current >= COMPLETION_TARGET) return;
    activity.current += 1;
    setProgress(Math.min(100, Math.round((activity.current / COMPLETION_TARGET) * 100)));
  }, []);

  const track = useCallback(
    (clientX: number, clientY: number, el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      setMouse({
        x: ((clientX - r.left) / r.width) * 2 - 1,
        y: -(((clientY - r.top) / r.height) * 2 - 1),
      });
      bump();
    },
    [bump],
  );

  useEffect(() => {
    if (phase === "tracing" && progress >= 100) {
      void destroySigil(sigil.id).then(() => {
        router.push("/grimoire/library?view=completed");
      });
    }
  }, [phase, progress, sigil.id, router]);

  const color = emotion ? EMOTIONS[emotion].color : "#FF6F37";

  if (phase === "confirm") {
    return (
      <div className="grid min-h-dvh place-items-center bg-black px-6 text-center">
        <div className="flex max-w-sm flex-col items-center gap-6">
          <h1 className="font-serif text-2xl text-zinc-100">Close this case?</h1>
          <p className="text-sm text-zinc-400">
            Destroying “{sigil.name}” marks its work complete. It moves to your
            closed cases and cannot be reopened.
          </p>
          <div className="flex gap-3">
            <button type="button" onClick={() => router.back()}
              className="rounded-full border border-zinc-700 px-6 py-2.5 text-zinc-300 transition hover:border-zinc-500">
              Not yet
            </button>
            <button type="button" onClick={() => setPhase("pick")}
              className="rounded-full bg-red-800 px-6 py-2.5 font-medium text-white transition hover:bg-red-700">
              Begin the rite
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "pick") {
    return (
      <div className="grid min-h-dvh place-items-center bg-black px-6">
        <EmotionPicker ritual="destroy" onPick={(e) => { setEmotion(e); setPhase("tracing"); }} />
      </div>
    );
  }

  // tracing
  return (
    <div
      className="relative min-h-dvh touch-none overflow-hidden bg-black"
      onMouseMove={(e) => track(e.clientX, e.clientY, e.currentTarget)}
      onTouchMove={(e) => {
        const t = e.touches[0];
        if (t) track(t.clientX, t.clientY, e.currentTarget);
      }}
    >
      <div className="absolute inset-0">
        <EvilEye eyeColor={color} externalMouse={mouse} backgroundColor="#000000" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-3 p-8 text-center">
        <p className="text-sm text-zinc-400">
          Hold its gaze. Let the {emotion ? EMOTIONS[emotion].label.toLowerCase() : "feeling"} burn it away.
        </p>
        <div className="h-1.5 w-56 overflow-hidden rounded-full bg-zinc-900">
          <div className="h-full rounded-full transition-[width] duration-200"
            style={{ width: `${progress}%`, backgroundColor: color, boxShadow: `0 0 12px ${color}` }} />
        </div>
        <button type="button"
          onClick={() => { activity.current = COMPLETION_TARGET; setProgress(100); }}
          className="pointer-events-auto mt-1 text-xs text-zinc-700 underline-offset-4 hover:text-zinc-500 hover:underline">
          finish now
        </button>
      </div>
    </div>
  );
}
