"use client";

/**
 * TutorialOverlay — the first-run greeting from Harper & Bennet.
 * STATUS: implemented (centered/bottom-sheet; anchored spotlight is a
 * documented follow-up — docs/plans/M6-tutorial.md)
 *
 * Renders only on the first /home visit while the tutorial is incomplete.
 * Dimmed backdrop + character portraits + speech + Next/Skip. Skip is always
 * available (acceptance criterion). NOTE (built unseen): portrait sizing and
 * the mobile bottom-sheet layout want a real-device pass.
 *
 * @see docs/features/tutorial.md
 */
import { usePathname } from "next/navigation";
import { useTutorial } from "@/context/TutorialProvider";
import { TutorialCharacter } from "@/components/tutorial/TutorialCharacter";

export function TutorialOverlay() {
  const pathname = usePathname();
  const { completed, hydrated, stepIndex, steps, next, skip } = useTutorial();

  if (!hydrated || completed || pathname !== "/home") return null;

  const step = steps[stepIndex];
  if (!step) return null;

  const harperActive = step.speaker === "harper" || step.speaker === "both";
  const bennetActive = step.speaker === "bennet" || step.speaker === "both";
  const isLast = stepIndex === steps.length - 1;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-md rounded-3xl border border-zinc-700 bg-zinc-900/95 p-6 shadow-2xl">
        <div className="flex items-end justify-center gap-8">
          {(step.speaker === "harper" || step.speaker === "both") && (
            <TutorialCharacter who="harper" active={harperActive} />
          )}
          {(step.speaker === "bennet" || step.speaker === "both") && (
            <TutorialCharacter who="bennet" active={bennetActive} />
          )}
        </div>

        <div className="mt-5 flex flex-col gap-3 text-center">
          {step.harper && harperActive && (
            <p className="text-zinc-100">
              <span className="text-violet-300">Harper:</span> {step.harper}
            </p>
          )}
          {step.bennet && bennetActive && (
            <p className="text-zinc-100">
              <span className="text-sky-300">Bennet:</span> {step.bennet}
            </p>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button type="button" onClick={skip}
            className="text-xs text-zinc-500 underline-offset-4 hover:text-zinc-300 hover:underline">
            Skip
          </button>
          <div className="flex items-center gap-1.5" aria-hidden>
            {steps.map((_, i) => (
              <span key={i}
                className={"size-1.5 rounded-full " + (i === stepIndex ? "bg-violet-400" : "bg-zinc-700")} />
            ))}
          </div>
          <button type="button" onClick={next}
            className="rounded-full bg-violet-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-violet-500">
            {isLast ? "Begin" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
