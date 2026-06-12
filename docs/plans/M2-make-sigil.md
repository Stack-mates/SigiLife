# M2 Plan — Make Sigil

> **Superseded in part (2026-06-12):** PR1–PR3 shipped with changed rules —
> extraction keeps symbols/accented consonants (extractSigilCharacters),
> glyphs trace at runtime (ADR-008, no seed/SvgVector), single-canvas editor.
> PR4 (server save, profanity, slots, shares) moved to the auth milestone
> (ADR-009). See docs/features/make-sigil.md for current truth.

**Spec:** [../features/make-sigil.md](../features/make-sigil.md) ·
**Exit:** end-to-end sigil creation on a phone; consonant rules match v1;
slot limit enforced server-side; all feature-doc acceptance criteria checked.

## Open questions to resolve FIRST (write answers into make-sigil.md)
- [ ] Intention max length (proposal: 280)
- [ ] Keep v1's admin-only SVG import on the canvas? (proposal: drop)
- [ ] Which font seeds the letterforms (v1 used public/fonts — confirm same)

## Dependency gate (ADR each, per ADR-006)
- [ ] `fabric` (canvas) — ADR: version, dynamic-import-only policy
- [ ] `opentype.js` (seed script only — devDependency)
- [ ] `vitest` (+ config) — ADR: test policy graduates from "none" (CONVENTIONS ✎)

## Tasks (ordered; ✎ = doc update in same PR)

### PR 1 — pure logic + seed data (no UI; the testable core)
1. Vitest setup; `npm run test` script. ✎ CONVENTIONS testing section.
2. `lib/sigil/extractSigilCharacters.ts` — port v1 logic EXACTLY (read
   `main:src/components/.../WriteSigil.tsx` first; lock behavior with unit
   tests incl. unicode/empty/vowel-only cases). ✎ flip STATUS.
3. `prisma/seed.ts` — port `main:server/prisma/seed-opentype.js`: font →
   per-character SVG paths → upsert SvgVector (idempotent). Run it; commit
   nothing DB-side (seed is repeatable per env).
4. `lib/validation` — `vectorsSchema`, `createSigilSchema`.
5. `app/api/vectors/route.ts` — implement POST (session, validate, lookup).
   ✎ API_CONTRACT.

### PR 2 — wizard state + write step
6. `context/MakeSigilProvider.tsx` — draft shape from its comment block,
   step-validity selectors, sessionStorage mirror, reset().
7. `make-sigil/layout.tsx` — "use client", provider mount, step indicator.
8. `make-sigil/write/page.tsx` + `components/sigil/WriteSigil.tsx` — textarea,
   live consonant chips, max length, NextButton gating. (Profanity check:
   server-side only at save — no standalone precheck endpoint; the write
   step just warns on obvious words client-side with a static list. ✎ note
   in API_CONTRACT content-filtering section.)
9. `components/layout/NextButton.tsx` — implement. ✎ flip STATUS lines.

### PR 3 — the canvas (the big one)
10. `make-sigil/draw/page.tsx` + `components/sigil/DrawSigilCanvas.tsx` —
    port v1 DrawSigil: Fabric init (dynamic import), draw/manipulate modes,
    brush color+width, undo/redo history (≥20), clear/delete, touch events.
    Step guard → /write when draft empty.
11. `lib/sigil/vectorSeed.ts` — layout math for seeding letterforms; unit
    test the layout (pure). Canvas export (JSON + PNG dataURL) into the draft.
    ✎ flip STATUS, COMPONENT_MAP.

### PR 4 — style + save + slots
12. `lib/entitlements.ts` — M2 version: `getSlotLimit` returns
    FREE_SLOT_LIMIT (12), `canCreateSigil` counts ACTIVE sigils. (M7 swaps
    internals; callers won't change. ✎ note in monetization.md.)
13. `app/api/sigils/route.ts` POST — validate, Bad Words API server check,
    slot check → LIMIT_REACHED, transaction: create Sigil (+ shares when
    M3 lands social — shareWith accepted but may no-op until follows exist;
    ✎ API_CONTRACT note), sigilCount++.
14. `make-sigil/style/page.tsx` + `components/sigil/StyleSigil.tsx` — color/
    ring/glow over preview, name, save → redirect /charge-sigil/[id]
    (placeholder page is fine — M3/M5 own it). Slot-full panel.
15. `components/premium/SlotMeter.tsx` — basic used/12 version. ✎ flip STATUS.

## Verification
- Unit: extractSigilCharacters + vectorSeed green in CI (`npm run test`).
- Phone E2E: write → draw with finger → undo/redo torture (20+) → style →
  save → row in db:studio with canvasData + imageData; library stub URL loads.
- 13th sigil attempt → LIMIT_REACHED surfaced as the slot-full panel.
- Profanity in intention → VALIDATION error with flagged words.

## Done = ROADMAP M2 row checked + **write docs/plans/M3-grimoire.md** (the
just-in-time horizon moves: M3 detail gets written now, not before).
