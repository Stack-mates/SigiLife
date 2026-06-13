# M5 Plan — Rituals (charge & destroy ceremonies)

**Spec:** [../features/charge-destroy.md](../features/charge-destroy.md) ·
**Local-first (ADR-009):** rituals read/update sigils via
`lib/sigil/localStore.ts`; no auth/DB. Charge sets isCharged + chargedEmotion
locally; destroy flips status (the mechanical flip already exists — this adds
the ceremony around it).
**Exit:** charging a sigil runs the fluid-trace ritual and persists the
emotion; destroying runs the evil-eye ceremony and moves it to Closed cases.
Both feel good on a phone. Feature-doc acceptance criteria met.

## Decisions locked (resolve feature-doc open questions)
- **Emotions = the 5 canonical ones** (HOPE/GRIEF/RELIEF/JOY/LONGING) from
  `types/index.ts` EMOTIONS, NOT v1's 12. Each carries its ritual color there.
- **Re-charge overwrites** the emotion (more engagement).
- **Completion is explicit** — an interaction/coverage meter drives it, not a
  blind timer.
- **Reduced-motion**: every WebGL effect honors prefers-reduced-motion with a
  static fallback; cleanup on unmount (v1 leaked render loops).
- Destroy done-state stays open for the future "closed case" print (monetization).

## Dependency gate
- [ ] `ogl` — EvilEye uses it (ADR-010). SplashCursor + GhostCursor are raw
  WebGL (no dep).

## Porting strategy
v1 effects come over via `git show main:<path> > <newpath>` then adapt — do
NOT retype 1000+ lines. Adaptations per file: `"use client"`, named export,
add props (emotion color, onActivity/onComplete), bias generated colors
toward the emotion color, add unmount cleanup + reduced-motion guard, and a
file-level eslint-disable header (third-party-derived shader code is exempt
from our lint rules — note in CONVENTIONS).

## Tasks (ordered; ✎ = doc update in same PR)

### PR 1 — shared plumbing
1. `lib/sigil/localStore.ts` — add `isCharged?`, `chargedEmotion?: EmotionKey`
   to StoredSigil; add `chargeSigil(id, emotion)`. Unit-test the transition.
2. `components/charge/EmotionPicker.tsx` — fresh build over EMOTIONS (5),
   `{ onPick, ritual }`; swatch per emotion color. Shared by both rituals.
   ✎ flip STATUS.

### PR 2 — charge ritual
3. `components/charge/SplashCursor.tsx` — port v1 (1053 lines), add
   `emotionColor` + `onActivity`, cleanup, reduced-motion. eslint-disable header.
4. `components/charge/ChargeRitual.tsx` — orchestrate: EmotionPicker →
   faint sigil + SplashCursor in the emotion color → activity meter to
   completion → `chargeSigil` → done (Home / view sigil).
5. `app/(app)/charge-sigil/[sigilId]/page.tsx` — load sigil from store
   (owner concept N/A pre-auth), mount ChargeRitual; unknown id → graceful.
   ✎ flip STATUS, COMPONENT_MAP.

### PR 3 — destroy ritual
6. `components/destroy/EvilEye.tsx` (port, ogl) + `GhostCursor.tsx` (port,
   raw WebGL) — emotion color, cleanup, reduced-motion.
7. `components/destroy/DestroyRitual.tsx` — in-fiction confirm →
   EmotionPicker → EvilEye + GhostCursor → completion → `destroySigil` →
   route to Closed cases.
8. `app/(app)/destroy-sigil/[sigilId]/page.tsx` — mount DestroyRitual.
9. `grimoire/sigil/[sigilId]/page.tsx` — replace inline destroy with routes:
   "Charge" → /charge-sigil/[id], "Destroy" → /destroy-sigil/[id]; show
   charged badge + chargedEmotion. ✎ grimoire.md note.

## Verification
- Unit: localStore charge transition green.
- Phone E2E: open a sigil → Charge → pick emotion → trace → completes →
  badge shows emotion → reopen still charged. Destroy → ceremony → lands in
  Closed cases. Reduced-motion OS setting → static fallbacks, no crash.
- 60fps sanity on a mid-range phone (degrade particle counts, not framerate).
- typecheck/lint/build/test clean.

## Done = ROADMAP M5 row updated. Next likely: the home hub ("The Office")
to give rituals a front door, or the auth/DB milestone. Confirm then.
