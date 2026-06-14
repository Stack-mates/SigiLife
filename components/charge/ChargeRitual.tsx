"use client";

/**
 * ChargeRitual — orchestrates the charge ceremony.
 * STATUS: implemented (persists to the database via lib/sigil/actions)
 *
 * Flow: EmotionPicker → faint sigil over black with <SplashCursor> tinted to
 * the emotion color → an engagement meter fills as the user traces (explicit
 * completion, not a blind timer) → chargeSigil(id, emotion) → done state.
 * Reduced-motion: SplashCursor no-ops the WebGL; a tap-to-complete affordance
 * still lets the ritual finish.
 *
 * @see docs/features/charge-destroy.md
 */
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SplashCursor } from "@/components/charge/SplashCursor";
import { EmotionPicker } from "@/components/charge/EmotionPicker";
import { SigilRenderer } from "@/components/sigil/SigilRenderer";
import { chargeSigil } from "@/lib/sigil/actions";
import type { SigilView } from "@/lib/sigil/types";
import { EMOTIONS, type EmotionKey } from "@/types";

type Phase = "pick" | "tracing" | "done";

/** Engagement units (one per pointer-move tick) needed to complete. */
const COMPLETION_TARGET = 120;

export function ChargeRitual({ sigil }: { sigil: SigilView }) {
  const [phase, setPhase] = useState<Phase>("pick");
  const [emotion, setEmotion] = useState<EmotionKey | null>(null);
  const [progress, setProgress] = useState(0);
  const activity = useRef(0);

  const onActivity = useCallback(() => {
    if (activity.current >= COMPLETION_TARGET) return;
    activity.current += 1;
    setProgress(Math.min(100, Math.round((activity.current / COMPLETION_TARGET) * 100)));
  }, []);

  // Complete once the meter fills.
  useEffect(() => {
    if (phase === "tracing" && progress >= 100 && emotion) {
      setPhase("done");
      void chargeSigil(sigil.id, emotion);
    }
  }, [phase, progress, emotion, sigil.id]);

  const color = emotion ? EMOTIONS[emotion].color : "#9e38fd";

  if (phase === "pick") {
    return (
      <div className="grid min-h-dvh place-items-center bg-black px-6">
        <div className="flex flex-col items-center gap-10">
          <SigilRenderer sigil={sigil} />
          <EmotionPicker
            ritual="charge"
            onPick={(e) => {
              setEmotion(e);
              setPhase("tracing");
            }}
          />
        </div>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="grid min-h-dvh place-items-center bg-black px-6 text-center">
        <div className="flex flex-col items-center gap-6">
          <SigilRenderer sigil={{ ...sigil, isCharged: true, chargedEmotion: emotion ?? undefined }} />
          <p className="font-serif text-2xl text-zinc-100">
            Charged with {emotion ? EMOTIONS[emotion].label.toLowerCase() : ""}.
          </p>
          <div className="flex gap-3">
            <Link href={`/grimoire/sigil/${sigil.id}`}
              className="rounded-full bg-violet-600 px-6 py-2.5 font-medium text-white transition hover:bg-violet-500">
              View sigil
            </Link>
            <Link href="/grimoire/library"
              className="rounded-full border border-zinc-700 px-6 py-2.5 text-zinc-300 transition hover:border-zinc-500">
              The library
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // tracing
  return (
    <div className="relative min-h-dvh touch-none bg-black">
      <SplashCursor emotionColor={color} onActivity={onActivity} />
      {/* faint sigil to trace over */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-30">
        <SigilRenderer sigil={sigil} />
      </div>
      {/* progress + reduced-motion fallback */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[60] flex flex-col items-center gap-3 p-8 text-center">
        <p className="text-sm text-zinc-400">
          Trace your sigil. Pour the {emotion ? EMOTIONS[emotion].label.toLowerCase() : "feeling"} in.
        </p>
        <div className="h-1.5 w-56 overflow-hidden rounded-full bg-zinc-800">
          <div className="h-full rounded-full transition-[width] duration-200"
            style={{ width: `${progress}%`, backgroundColor: color, boxShadow: `0 0 12px ${color}` }} />
        </div>
        <button
          type="button"
          onClick={() => { activity.current = COMPLETION_TARGET; setProgress(100); }}
          className="pointer-events-auto mt-1 text-xs text-zinc-600 underline-offset-4 hover:text-zinc-400 hover:underline"
        >
          finish now
        </button>
      </div>
    </div>
  );
}
