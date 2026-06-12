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

## Design decision for M4: model `Place` as a first-class concept

Sponsored locations are a planned post-traction revenue stream (see
features/monetization.md "Future revenue: partnerships" — the Niantic-style
sanctified-sites model). To keep that a column instead of a rewrite, decide
at M4 kickoff whether sigils attach to a **`Place`** row (id, name, lat/lng,
and later: `sponsorId`, perk/art overrides) rather than carrying raw
lat/lng + locationName themselves. Cost now: one join + a findOrCreate on
placement. Option value: sponsored sites, per-place sigil clustering, and
"charge here for a bonus" geo-verification all become additive.
If adopted: ✎ DATA_MODEL.md + schema in the same PR (CLAUDE.md rule #1).

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
- **`Place` as first-class model — decide at M4 kickoff** (see design
  decision above; default lean: yes, the migration cost only grows later).
- Marker rendering at scale: raw markers vs cluster layer threshold.
- Should unplaced sigils be nudged toward placement (empty-map cold start)?
