/**
 * TutorialOverlay — renders the current tutorial step.
 * STATUS: stub · "use client" (M6) · dynamically imported by (app)/layout
 *   ONLY for users with hasCompletedTutorial === false (zero bundle cost
 *   for everyone else)
 *
 * Reads current step from TutorialProvider; renders: dimmed backdrop,
 * optional anchor spotlight (cutout over the step's selector),
 * <TutorialCharacter> portrait + speech bubble, Next / Skip (skip is ALWAYS
 * visible — acceptance criterion). On final step: PATCH hasCompletedTutorial.
 * Phone-portrait safe: bubble repositions so it never covers the anchor.
 *
 * v1 reference: git show main:src/components/Tutorial/TutorialBlockOverlay.tsx
 *   and main:src/components/ui/TutorialOverlay.tsx
 * @see docs/features/tutorial.md
 */
export function TutorialOverlay() {
  return null;
}
