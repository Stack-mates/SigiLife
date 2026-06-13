"use client";

/**
 * TutorialProvider — first-run tutorial state.
 * STATUS: implemented (local-first; completion in localStorage until the DB
 * stores User.hasCompletedTutorial)
 *
 * Holds the completed flag + current step, exposes controls, and renders the
 * overlay alongside children. Mounted in (app)/layout. The overlay itself
 * decides where it shows (first /home visit) — see TutorialOverlay.
 *
 * @see docs/features/tutorial.md, docs/plans/M6-tutorial.md
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { TUTORIAL_STEPS } from "@/components/tutorial/tutorialScript";
import { TutorialOverlay } from "@/components/tutorial/TutorialOverlay";

const STORAGE_KEY = "sigilife:tutorial-complete";

type TutorialContextValue = {
  completed: boolean;
  hydrated: boolean;
  stepIndex: number;
  steps: typeof TUTORIAL_STEPS;
  next: () => void;
  skip: () => void;
  replay: () => void;
};

const TutorialContext = createContext<TutorialContextValue | null>(null);

export function TutorialProvider({ children }: { children: React.ReactNode }) {
  const [completed, setCompleted] = useState(true); // assume done until hydrated (no flash for returners)
  const [hydrated, setHydrated] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    try {
      setCompleted(localStorage.getItem(STORAGE_KEY) === "true");
    } catch {
      setCompleted(false);
    }
    setHydrated(true);
  }, []);

  const finish = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // best-effort
    }
    setCompleted(true);
  }, []);

  const next = useCallback(() => {
    setStepIndex((i) => {
      if (i >= TUTORIAL_STEPS.length - 1) {
        finish();
        return i;
      }
      return i + 1;
    });
  }, [finish]);

  const skip = useCallback(() => finish(), [finish]);

  const replay = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // best-effort
    }
    setStepIndex(0);
    setCompleted(false);
  }, []);

  const value = useMemo<TutorialContextValue>(
    () => ({ completed, hydrated, stepIndex, steps: TUTORIAL_STEPS, next, skip, replay }),
    [completed, hydrated, stepIndex, next, skip, replay],
  );

  return (
    <TutorialContext.Provider value={value}>
      {children}
      <TutorialOverlay />
    </TutorialContext.Provider>
  );
}

export function useTutorial(): TutorialContextValue {
  const ctx = useContext(TutorialContext);
  if (!ctx) throw new Error("useTutorial must be used inside TutorialProvider");
  return ctx;
}
