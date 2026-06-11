/**
 * WorldMap — the shared Mapbox map (view mode + placement mode).
 * STATUS: stub · "use client" · mapbox-gl/react-map-gl (M4 deps, ADR-006), no SSR
 *
 * Props (planned):
 *   mode: "view" (grimoire/map — markers + VotePanel) | "place"
 *         (place-sigil — draggable pin + confirm)
 *   sigils?: MapSigil[] · initialCenter (user homeLocation) ·
 *   onPlace?: ({lat, lng, name}) => void
 * What goes here (M4): react-map-gl Map with shared defaults from
 * lib/mapbox; <SigilMarker> per sigil; mine/all filter control; cluster
 * when marker count is high (threshold — feature doc open question).
 *
 * v1 reference: git show main:src/components/.../LeftPage/Map/MapBox.tsx
 * @see docs/features/map.md
 */
export function WorldMap() {
  return <div>WorldMap (stub)</div>;
}
