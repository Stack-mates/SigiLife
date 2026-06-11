# Feature: Map & Placement

**Milestone:** M4 · **Status:** stub

## Purpose
The shared world: every placed sigil appears on a global Mapbox map where
the community votes ✨/🔥. Placement = choosing a real-world anchor for a
sigil (at creation or later).

## User stories
- The map opens centered on my home location and shows sigil markers.
- I filter: all sigils / only mine.
- Tapping a marker shows the sigil (image, name, owner, scores) and lets me vote.
- Voting toggles: same vote again retracts; opposite vote switches.
- I place/move my sigil via search (geocoder) or dropping a pin.

## Components & routes
- `grimoire/map/page.tsx` → `map/WorldMap` (client) + `map/SigilMarker` +
  `map/VotePanel`.
- `place-sigil/[sigilId]/page.tsx` → `map/WorldMap` + `map/MapSearchBox`.
- `lib/mapbox.ts` — token access, shared map defaults, geocoding helper.

## API / data
- `GET /api/sigils?scope=all&status=active` (markers need: id, name,
  imageData thumb, lat/lng, scores, owner username).
- `POST /api/sigils/[id]/vote` — transactional toggle + score recompute.
- `PATCH /api/sigils/[id]` — location update (owner).

## v1 reference (`main`)
`src/components/SigilRoomHome/Grimoire/LeftPage/Map/MapBox.tsx` (marker
popup UX, filter), `MapSearchBox.tsx`; vote logic in
`server/routes/sigil.routes.ts`.

## Acceptance criteria
- [ ] Map renders <2s on 4G with 500 markers (cluster if needed).
- [ ] Vote round-trip updates the panel optimistically and reconciles.
- [ ] One vote per user per sigil enforced by the DB unique constraint, not just UI.
- [ ] No Mapbox secret leakage: only the pk. public token, via NEXT_PUBLIC_MAPBOX_TOKEN.

## Open questions
- Marker rendering at scale: raw markers vs cluster layer threshold.
- Should unplaced sigils be nudged toward placement (empty-map cold start)?
