# Feature: Grimoire (book shell, library, sigil page)

**Milestone:** M3 · **Status: core implemented 2026-06-12 (local-first)**

> Local-first era (ADR-009): the grimoire reads `lib/sigil/localStore.ts` —
> the same on-device store the style step writes. That module is THE seam:
> when the DB lands, its callers swap to API calls with identical shapes.
> Shipped: book shell with ribbon tabs, library grid (active), "Closed
> cases" view (destroyed), sigil page with inline rename and confirm+destroy
> (mechanical status flip; ritual visuals are the rituals milestone).
> Deferred to DB era: profile spread, map, friends, votes, SigiLites,
> pick-mode routing. Destroyed-view name decided: **"Closed cases."**
> Book shell decided: modern dark shell now, Lino art frame as polish pass.

## Purpose
The user's spellbook: a two-page book UI that frames the map, library,
profile, friends, and settings. The library is the management surface for
the user's own sigils.

## User stories
- Opening the grimoire shows a book: profile summary left, library right.
- The library shows all my ACTIVE sigils as thumbnails; destroyed ones live
  in a "completed" view (new in rebuild — v1 lost them).
- Tapping a sigil opens its page: image, intention, charge state + emotion,
  scores, SigiLites, location; I can rename it, start charge/destroy,
  or open placement.
- Library can be entered in "pick mode" from the home hub (charge/destroy
  buttons route through it to select a target sigil).

## Components & routes
- `grimoire/layout.tsx` + `grimoire/GrimoireBook` (book frame, page slots —
  uses Bookshelf/book Lino art from `public/art/`).
- `grimoire/page.tsx` (default spread: `grimoire/LeftPage` + `grimoire/RightPage`).
- `grimoire/library/page.tsx` (+ `?pick=charge|destroy` mode) → `sigil/SigilThumb` grid.
- `grimoire/sigil/[sigilId]/page.tsx` → `sigil/SigilRenderer`, `map/VotePanel`.

## API / data
- `GET /api/sigils?scope=mine&status=active|destroyed`
- `GET/PATCH/DELETE /api/sigils/[id]`
- Server components fetch via prisma directly (`lib/prisma.ts`); the API
  routes serve client-side mutations.

## v1 reference (`main`)
`src/components/SigilRoomHome/Grimoire/**` — esp. `RightPage/SigiLibrary/*`.
Note v1's `SigilPage.tsx` line ~131 opacity-0.20 bug; don't port it.

## Acceptance criteria
- [ ] Book layout works portrait (stacked pages) and landscape (spread).
- [ ] Library distinguishes charged/uncharged and active/destroyed at a glance.
- [ ] Pick-mode routes: home → library?pick=charge → /charge-sigil/[id].
- [ ] Rename validates ≤100 chars and persists.

## Open questions
- Page-turn animation: worth it for launch or M9 polish?
- Destroyed-sigil view naming ("Closed cases"? fits The Office fiction).
