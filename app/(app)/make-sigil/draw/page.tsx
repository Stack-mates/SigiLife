/**
 * Draw step — the sigil canvas.
 * STATUS: stub
 * Route: /make-sigil/draw · client-heavy page (ARCHITECTURE.md exception list)
 *
 * What goes here (M2): guard (no intention in draft → redirect /write), then
 * mounts <DrawSigilCanvas> (components/sigil) with letterform seeds fetched
 * from POST /api/vectors for the draft's consonants. Fabric.js is dynamically
 * imported here — never in a server bundle.
 *
 * @see docs/features/make-sigil.md
 */
export default function DrawStepPage() {
  return <main className="p-8">draw sigil (stub)</main>;
}
