"use client";

/**
 * TutorialProvider — tutorial step state.
 * STATUS: stub (M6)
 *
 * What goes here (M6):
 * - Current step (from tutorialScript, filtered by the active route),
 *   advance / skip / complete actions.
 * - In-progress position may live client-side (sessionStorage); COMPLETION
 *   persists via PATCH /api/users/[id] {hasCompletedTutorial: true} so it
 *   survives device switches (v1 used sessionStorage only — bug class).
 * - usePageTutorial(pathname) hook consumed by TutorialOverlay.
 * - Mounted by (app)/layout only when the user hasn't completed the tutorial.
 *
 * v1 reference: git show main:src/context/TutorialContext.tsx
 * @see docs/features/tutorial.md
 */
export function TutorialProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
