/**
 * DrawSigilCanvas — the Fabric.js sigil drawing surface.
 * STATUS: stub · "use client" · fabric is dynamically imported (M2 dep, ADR-006)
 *
 * Props (planned): { seeds: SvgVector[] } — letterform vectors laid onto the
 * canvas via lib/sigil/vectorSeed as manipulable objects.
 * What goes here (M2):
 * - Two modes: draw (free brush; color + thickness controls) and manipulate
 *   (select/move/scale/rotate objects). Touch-first.
 * - History stack: undo/redo (≥20 steps) via canvas JSON snapshots; clear;
 *   delete-selected.
 * - Exposes the canvas state to MakeSigilProvider (canvas JSON + PNG render)
 *   for the style step and save.
 *
 * v1 reference: git show main:src/components/.../MakeSigilComponents/DrawSigil.tsx
 *   (complete Fabric config + history impl — port the logic, drop the
 *   admin-only SVG import unless the open question says keep)
 * @see docs/features/make-sigil.md
 */
export function DrawSigilCanvas() {
  return <div>DrawSigilCanvas (stub)</div>;
}
