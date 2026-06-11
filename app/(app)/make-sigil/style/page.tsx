/**
 * Style step — styling, naming, placing, sharing, saving.
 * STATUS: stub
 * Route: /make-sigil/style
 *
 * What goes here (M2): mounts <StyleSigil> (components/sigil) — stroke color /
 * ring / glow controls over a preview render, name input, optional location
 * (MapSearchBox, M4), SigiFriend share picker, Save → POST /api/sigils.
 * On success: route to /charge-sigil/[newId] (the loop flows straight into
 * the charge ritual). LIMIT_REACHED → slot-full panel with destroy/premium links.
 *
 * v1 reference: git show main:src/components/.../MakeSigilComponents/SaveSigil.tsx
 * @see docs/features/make-sigil.md
 */
export default function StyleStepPage() {
  return <main className="p-8">style & save (stub)</main>;
}
