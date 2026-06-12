# Feature: Make Sigil (write → draw → style)

**Milestone:** M2 · **Status: core implemented 2026-06-12** (server save
deferred — ADR-009)

## Purpose
The core creation wizard. Intention text → character extraction → a single
modern canvas editor seeded with TRUE VECTOR letterforms traced from the
sigil font → style + name → keep.

## Character extraction (rules locked 2026-06-12 — supersedes v1 consonants-only)
Implemented in `lib/sigil/extractSigilCharacters.ts` (unit-tested):
- **KEEP:** consonant letters incl. accented (ñ, ç, ß…), symbols & punctuation (&, !, ?)
- **STRIP:** vowels incl. accented forms (a/é/ü…), spaces, digits, duplicates
- **Dedup:** first instance wins; case-insensitive for letters ("S" then "s"
  keeps "S"); ñ and n are distinct letters; symbols dedup exactly; "y" is a
  consonant. Order of first appearance preserved. Max intention: 280 chars.

## Letterforms: runtime glyph tracing (ADR-008 — replaces SvgVector table)
`POST /api/vectors` traces outlines on demand with opentype.js from
`public/fonts/UncialAntiqua-Regular.ttf` (`lib/sigil/traceGlyphs.ts`,
font parsed once + cached). Any glyph the font covers works — verified
incl. accented consonants and symbols. Characters without a glyph return
in `missing` and the editor tells the user to draw them by hand. No DB.

## The editor (single canvas — supersedes v1's draw/manipulate split)
`components/sigil/DrawSigilCanvas.tsx`, Fabric.js (dynamic import only):
- **Select tool** (default): move/scale/rotate letterforms AND drawn strokes;
  color control recolors the selection (fills for letterforms, strokes for pen).
- **Pen tool:** PencilBrush freehand, color + width (2–16), round caps.
- Undo/redo (JSON snapshot history), delete selection, clear-and-reseed
  (clears drawing, restores the letterform ring).
- Letterforms seed in a deterministic loose ring (`lib/sigil/vectorSeed.ts`,
  unit-tested) as fabric.Path objects — lossless scaling, full path data.
- Responsive: logical 600×600 space, zoom-fitted to viewport via ResizeObserver.

## Wizard state
`context/MakeSigilProvider.tsx`: draft (intention, canvasJson, imageDataUrl,
style {color, ring, glow}, name), characters always derived, sessionStorage
mirror (refresh-safe), step-validity guards (draw needs characters, style
needs a canvas).

## Style step (lean local version)
Name + ring/glow toggles + aura color, CSS-previewed; "Keep this sigil"
stores the finished draft in localStorage (`sigilife:finished-sigils`) +
PNG download. **Deferred to the auth/DB milestone:** real POST /api/sigils,
profanity filter, slot enforcement, share-with-friends, baking ring/glow
into the final render, migrating locally-kept sigils into the grimoire.

## v1 reference (`main`)
`src/components/SigilRoomHome/MakeSigil/**` — consulted for Fabric patterns;
extraction and architecture intentionally diverge (rules above).

## Acceptance criteria
- [x] Consonant/symbol extraction matches the locked rules (12 unit tests)
- [x] Letterforms are editable vector paths, any font-covered glyph incl. ñ/&
- [x] One canvas, select + pen, no mode pages
- [x] Undo/redo, delete, clear-and-reseed
- [x] End-to-end create on a phone with touch drawing (verified on device 2026-06-12)
- [ ] Server persistence + profanity + slots (auth/DB milestone)

## Open questions
- ~~Intention max length~~ → 280. ~~Admin SVG import~~ → dropped.
- Font choice per-sigil (editor font picker) — Uncial Antiqua is the only
  seed font for now; revisit as a premium style hook (monetization.md).
- Touch basics verified on device (select/transform/pen work). Pinch-zoom /
  two-finger pan remain unimplemented — add if drawing detail demands it.
