/**
 * tutorialScript — the single source of all tutorial steps.
 * STATUS: stub (M6)
 *
 * Shape (planned):
 *   export type TutorialStep = {
 *     id: string;
 *     page: "/home" | "/make-sigil/write" | "/make-sigil/draw" | ...;
 *     speaker: "harper" | "bennet";
 *     text: string;
 *     anchor?: string;            // CSS selector to spotlight
 *     advanceOn: "next" | "action"; // button vs user performing the step
 *   };
 *   export const TUTORIAL_STEPS: TutorialStep[] = [...];
 *
 * Port the WRITING from v1 (it's good); restructure into this data shape.
 * Final step inventory waits for M5 screens to settle (feature doc note).
 *
 * v1 reference: git show main:src/components/Tutorial/Tutorialscript.ts
 * @see docs/features/tutorial.md
 */
export const TUTORIAL_STEPS: unknown[] = [];
