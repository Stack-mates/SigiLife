"use client";

/**
 * EmotionPicker — choose the ritual emotion. Shared by charge AND destroy.
 * STATUS: implemented
 *
 * Built on the 5 canonical emotions in types/index.ts EMOTIONS (the single
 * emotion→color source, also used by SplashCursor/EvilEye/SigilRenderer) —
 * NOT v1's ad-hoc 12. Each option shows its ritual color.
 *
 * @see docs/features/charge-destroy.md, docs/GLOSSARY.md
 */
import { EMOTIONS, type EmotionKey } from "@/types";

const ORDER: EmotionKey[] = ["HOPE", "JOY", "RELIEF", "LONGING", "GRIEF"];

export function EmotionPicker({
  ritual,
  onPick,
}: {
  ritual: "charge" | "destroy";
  onPick: (emotion: EmotionKey) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">
        {ritual === "charge" ? "What feeds this sigil?" : "What do you release?"}
      </p>
      <ul className="flex flex-wrap justify-center gap-3">
        {ORDER.map((key) => {
          const { label, color } = EMOTIONS[key];
          return (
            <li key={key}>
              <button
                type="button"
                onClick={() => onPick(key)}
                className="group flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/70 px-5 py-2.5 text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-800"
              >
                <span
                  className="size-3 rounded-full transition group-hover:scale-125"
                  style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
                  aria-hidden
                />
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
