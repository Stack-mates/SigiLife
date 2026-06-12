# M3 Plan — Grimoire (local-first)

**Spec:** [../features/grimoire.md](../features/grimoire.md) ·
**Re-scoped 2026-06-12 for ADR-009:** no DB yet, so the grimoire reads the
local sigil store (localStorage) that the style step writes. Follows/shares/
votes and server persistence join when the DB lands; the UI contracts built
here must not change at that point — only the data source behind them.
**Exit:** a user can open their grimoire, browse active and completed
sigils, open one, rename it, and destroy it (status flip) — all on-device.

## Open questions to resolve FIRST (write answers into grimoire.md)
- [ ] Destroyed-view naming (proposal: "Closed cases" — fits The Office)
- [ ] Book layout: full Lino art frame now, or modern dark shell now + art
      pass later? (proposal: modern shell now, consistent with the editor;
      art pass is a polish milestone)

## Tasks (ordered; ✎ = doc update in same PR)

### PR 1 — the local store (the future-API seam)
1. `lib/sigil/localStore.ts` — typed accessor over localStorage
   (`sigilife:finished-sigils`): `listSigils(status)`, `getSigil(id)`,
   `renameSigil`, `destroySigil` (status → DESTROYED + destroyedAt, never
   delete), `keepSigil` (used by StyleSigil). Adds `id` (crypto.randomUUID)
   + `status` to the record shape; migrates id-less records on read.
   Unit-test the migration + status transitions (storage mocked).
2. Refactor `components/sigil/StyleSigil.tsx` to call `keepSigil()`.
   ✎ make-sigil.md (store shape note).

### PR 2 — book shell + library
3. `components/grimoire/GrimoireBook.tsx` — modern dark shell with ribbon
   tabs: Library / Closed cases (+ Profile/Map/Friends as disabled "soon"
   tabs). Mounted by `grimoire/layout.tsx`.
4. `grimoire/library/page.tsx` + `components/sigil/SigilThumb.tsx` — client
   grid over `listSigils("ACTIVE")`; `?view=completed` shows DESTROYED with
   muted treatment; empty states in-fiction. Thumb → sigil page.
   ✎ flip STATUS lines, COMPONENT_MAP.

### PR 3 — sigil page + lifecycle
5. `grimoire/sigil/[sigilId]/page.tsx` + `components/sigil/SigilRenderer.tsx`
   — image, intention, kept date, style badges; client-side load by id from
   the store (404-equivalent empty state for unknown ids).
6. Rename inline (≤100 chars) via `renameSigil`.
7. Destroy: in-fiction confirm → `destroySigil` → routed back to library
   with the slot acknowledged. (The ritual VISUALS are M5 — this is the
   mechanical flip, exactly as the original M3 intended.)
   ✎ grimoire.md acceptance boxes, ROADMAP M3 row.

## Deferred to DB milestone (unchanged UI contracts)
Share/SigiLites, follows, votes, profile stats, map page, pick-mode routing
from The Office (home hub isn't built yet either).

## Verification
- Unit: localStore migration + transitions green.
- Browser E2E: create sigil → appears in library → open → rename →
  destroy → moves to Closed cases → library count updates. Refresh-safe.
- Unknown sigil id → graceful empty state, no crash.
- `npm run test/typecheck/lint/build` clean.

## Done = ROADMAP M3 row updated + write M5-rituals plan (M4 map needs the
DB-era Place decision, so rituals are the likely next phase — confirm then).
