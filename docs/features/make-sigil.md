# Feature: Make Sigil (write → draw → style)

**Milestone:** M2 · **Status:** stub

## Purpose
The core creation wizard. Intention text → unique-consonant extraction →
Fabric.js canvas seeded with letterform vectors → style (color/ring/glow) →
name + optional location + optional share → save.

## User stories
- I write an intention and watch its unique consonants appear live.
- I draw freely over/with the letterform shapes; I can move/scale/rotate
  pieces, undo/redo, clear.
- I color my strokes, add a ring, add a glow; I name the sigil.
- I optionally pin it to a place and share it with SigiFriends, then save —
  and I'm offered the charge ritual immediately.
- If my slots are full I'm told so and pointed at destroy (or premium).

## Flow & state
`make-sigil/layout.tsx` mounts `MakeSigilProvider` holding the draft
(intention, consonants, canvas JSON, style, name, location, shareWith).
Replaces v1's localStorage juggling; surviving a refresh is nice-to-have,
not required (provider may mirror to sessionStorage).

Steps: `/make-sigil/write` → `/draw` → `/style`. Entering `/make-sigil`
redirects to `/write`. Guard: `/draw` without an intention bounces back.

## Components
`sigil/WriteSigil` (textarea + consonant preview + profanity precheck),
`sigil/DrawSigilCanvas` (Fabric init, draw/manipulate modes, history stack),
`sigil/StyleSigil` (style controls + name + `map/MapSearchBox` + share picker
+ save), `layout/NextButton`.

## lib
- `lib/sigil/extractConsonants.ts` — pure function; port logic from
  `main:src/components/.../WriteSigil.tsx`. Unit-test this (first Vitest target).
- `lib/sigil/vectorSeed.ts` — lay letterform vectors onto the canvas.

## API / data
- `POST /api/vectors` — consonants → SvgVector rows.
- `POST /api/sigils` — full draft; server re-runs profanity filter + slot
  check (`lib/entitlements.ts`). `LIMIT_REACHED` → slot-full UI.
- Models: Sigil, SvgVector, SigilShare.

## v1 reference (`main`)
`src/components/SigilRoomHome/MakeSigil/**` (canvas config, brush settings,
history implementation), `server/routes/vector.routes.ts`,
`server/prisma/seed-opentype.js` (vector seeding).

## Acceptance criteria
- [ ] End-to-end create on a phone with touch drawing.
- [ ] Consonant extraction matches v1 behavior (case-insensitive, unique, consonants only).
- [ ] Undo/redo ≥ 20 steps without canvas corruption.
- [ ] Slot limit enforced server-side (client check is cosmetic).
- [ ] Profanity in the intention blocks save with a clear message.

## Open questions
- Keep v1's admin-only SVG import on the canvas? (lean: drop)
- Max intention length (v1 had none; propose 280 chars).
