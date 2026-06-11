/**
 * Sigil map — every placed sigil in the shared world.
 * STATUS: stub
 * Route: /grimoire/map · client-heavy page (Mapbox GL)
 *
 * What goes here (M4): mounts <WorldMap> (components/map) centered on the
 * user's homeLocation; markers from GET /api/sigils?scope=all&status=active;
 * mine/all filter; tapping a marker opens <VotePanel> (✨/🔥 community votes).
 * mapbox-gl is dynamically imported, client only.
 *
 * v1 reference: git show main:src/components/.../LeftPage/Map/MapBox.tsx
 * @see docs/features/map.md
 */
export default function MapPage() {
  return <main className="p-8">sigil map (stub)</main>;
}
