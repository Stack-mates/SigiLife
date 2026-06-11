# Feature: Tutorial (Harper Crowe & Bennet Voss)

**Milestone:** M6 · **Status:** stub

## Purpose
First-run guidance delivered in-fiction by two agents of The Office: Harper
Crowe and Bennet Voss (portraits in `public/art/`). Step-by-step overlays
walk a new user from the home hub through creating, charging, and
understanding their first sigil.

## User stories
- On first arrival at /home, Harper introduces The Office and points me to Make Sigil.
- On each wizard step, a character explains the mechanic (consonants, drawing, styling) once.
- I can dismiss/skip the tutorial at any time; it never re-triggers after
  completion (persisted, not per-device).
- Settings offers "replay tutorial".

## Design
- `tutorial/tutorialScript.ts` — the single source of all steps:
  `{ id, page, speaker: "harper"|"bennet", text, anchor?: selector, advanceOn: "next"|"action" }`.
  Port the script content from `main:src/components/Tutorial/Tutorialscript.ts`
  (the writing is good); restructure the data shape as above.
- `tutorial/TutorialOverlay.tsx` — renders current step: dimmed backdrop,
  optional anchor spotlight, character portrait + speech bubble, next/skip.
- `tutorial/TutorialCharacter.tsx` — portrait + name plate, Harper/Bennet swap.
- `context/TutorialProvider.tsx` — current step per page, advance/skip,
  syncs completion to `PATCH /api/users/[id] {hasCompletedTutorial: true}`.
  Mounted in `(app)/layout.tsx`.

## v1 reference (`main`)
`src/components/Tutorial/*`, `src/context/TutorialContext.tsx`. v1 tracked
progress in sessionStorage (lost on device switch) — rebuild persists to the
User row; in-progress step may stay client-side.

## Acceptance criteria
- [ ] Tutorial never blocks a stuck user: skip is always visible.
- [ ] Completion survives logout/login and device switch.
- [ ] Overlay works on phone portrait (speech bubble never covers the anchor target).
- [ ] Zero tutorial code in the bundle for completed users (dynamic import).

## Open questions
- Tutorial covers M1–M5 surfaces — final step list depends on those screens
  settling; write the step inventory when M5 lands.
