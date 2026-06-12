/**
 * ArViewer — the 8th Wall AR placement experience.
 * STATUS: stub · "use client" · dynamic import with ssr: false (M8, flag-gated)
 *
 * Props (planned): { sigil: SigilSummary; existing?: ArPlacement }
 * Pipeline: camera permission → XR8 init (pinned @8thwall/engine-binary;
 * globals typed in types/8thwall.d.ts) → SLAM localization → surface reticle
 * → tap to anchor the sigil image plane → PUT /api/ar/placements
 * {pos, quaternion}. Unsupported device → graceful fallback (never a crash).
 * License obligations (ADR-007): keep the Niantic copyright notice visible
 * (unmodified xr.js or in-app credit); engine binary must not be modified.
 *
 * v1 reference: git show main:src/components/.../Map/PlaceSigilInWorld.tsx
 * @see docs/features/ar.md
 */
export function ArViewer() {
  return <div>ArViewer (stub)</div>;
}
