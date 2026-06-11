/**
 * AR placement — anchor a sigil in physical space (8th Wall).
 * STATUS: stub · FLAG-GATED, post-launch (M8)
 * Route: /ar/[sigilId] · COOP/COEP headers set in next.config.ts for this
 * path only (SharedArrayBuffer requirement)
 *
 * What goes here (M8 — ⚠ resolve 8th Wall licensing first, see feature doc):
 * - Feature-flag + admin gate; graceful "not supported" screen otherwise.
 * - <ArViewer> (components/ar), dynamic import, ssr: false: camera permission
 *   → SLAM init (public/xr engine, types/8thwall.d.ts globals) → surface
 *   reticle → tap to place sigil image plane → PUT /api/ar/placements.
 *
 * v1 reference: git show main:src/components/.../Map/PlaceSigilInWorld.tsx
 * @see docs/features/ar.md
 */
export default async function ArPage({
  params,
}: {
  params: Promise<{ sigilId: string }>;
}) {
  const { sigilId } = await params;
  return <main className="p-8">AR placement for sigil {sigilId} (stub, flag-gated)</main>;
}
