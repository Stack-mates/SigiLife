"use client";

/**
 * MakeSigilProvider — the in-progress sigil draft across the wizard.
 * STATUS: stub (M2)
 *
 * Draft shape (planned):
 *   { intention: string; consonants: string[]; canvasJson: unknown | null;
 *     imageDataUrl: string | null; style: { color; ring; glow };
 *     name: string; location: {lat,lng,name} | null; shareWith: string[] }
 * What goes here (M2):
 * - useMakeSigil() hook: draft + per-step setters + reset (after save).
 * - Step validity selectors (canDraw = consonants.length > 0, canSave = ...)
 *   used by step guards and NextButton disabled states.
 * - Optional sessionStorage mirror so a refresh mid-wizard doesn't lose work
 *   (nice-to-have per feature doc; replaces v1's scattered localStorage).
 * - Mounted by app/(app)/make-sigil/layout.tsx only.
 *
 * @see docs/features/make-sigil.md
 */
export function MakeSigilProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
