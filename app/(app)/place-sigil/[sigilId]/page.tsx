/**
 * Place Sigil — choose/update a sigil's real-world map anchor.
 * STATUS: stub
 * Route: /place-sigil/[sigilId] · client-heavy page (Mapbox GL) · owner only
 *
 * What goes here (M4): <WorldMap> in placement mode + <MapSearchBox>
 * (geocoder). Search or drop a pin → confirm → PATCH /api/sigils/[id]
 * {locationName, latitude, longitude} → back to the sigil page.
 *
 * v1 reference: git show main:src/components/.../Map/MapSearchBox.tsx
 * @see docs/features/map.md
 */
export default async function PlaceSigilPage({
  params,
}: {
  params: Promise<{ sigilId: string }>;
}) {
  const { sigilId } = await params;
  return <main className="p-8">place sigil {sigilId} (stub)</main>;
}
