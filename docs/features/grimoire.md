# Feature: Grimoire (book shell, library, sigil page)

**Milestone:** M3 · **Status: core implemented 2026-06-12 (local-first)**

> **Now database-backed (2026-06-14).** Sigils persist in Postgres via the
> server-action data layer `lib/sigil/actions.ts` (replaced the old
> client-side localStore). Components call the actions (async) and map Prisma
> rows to `SigilView` (`lib/sigil/types.ts`). Sigils are owned by the current
> user — a dev-identity shim until Google auth (the last milestone, ADR-009).
> Shipped: book shell with ribbon tabs, library grid (active), "Closed
> cases" view (destroyed), sigil page with inline rename and confirm+destroy
> (mechanical status flip; ritual visuals are the rituals milestone).
> Deferred to DB era: profile spread, map, friends, votes, SigiLites,
> pick-mode routing. Destroyed-view name decided: **"Closed cases."**
> Book shell decided: modern dark shell now, Lino art frame as polish pass.
>
> **Update 2026-06-15:** map + votes shipped (M4); friends + DB-backed profile
> data shipped (see social.md).
>
> **Update 2026-06-17 — grimoire finished.** The default `/grimoire` spread now
> mounts `grimoire/LeftPage` (profile summary) + `grimoire/RightPage` (recent
> sigils) over `lib/user/actions.ts getMyProfile()` + `listSigils()`. The
> ribbon (GrimoireBook) now links all live surfaces — Grimoire / Library /
> Closed cases / Profile / Friends / Map / Settings (the disabled "soon"
> ribbons are gone). `/grimoire/profile` is now a DB-backed server component
> (real identity + follow counts + live ritual breakdown), replacing the old
> local-first client page. Counts come from real Sigil rows (the denormalized
> `User.sigilCount`/`destroyCount` are not maintained by the local-first
> create/destroy path, so they're bypassed).

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
