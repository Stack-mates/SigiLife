# Feature: Charge & Destroy Rituals

**Milestone:** M5 · **Status: implemented 2026-06-13 (local-first)**

> Local-first (ADR-009): rituals persist via `lib/sigil/localStore`
> (chargeSigil / destroySigil). Charge = EmotionPicker → SplashCursor fluid
> trace tinted to the emotion color → engagement meter to completion →
> isCharged + chargedEmotion saved. Destroy = in-fiction confirm →
> EmotionPicker → EvilEye (pupil follows pointer/touch) → meter → status flip
> → Closed cases. 5 canonical emotions from types/EMOTIONS. SplashCursor &
> EvilEye ported from v1 (ADR-010); GhostCursor dropped to avoid three.js
> (ADR-011). Reduced-motion: WebGL skipped, "finish now" affordance remains.
> Sigil page wires Charge/Destroy buttons + shows the charged badge.

## Purpose
The two rituals that make SigiLife feel like magic instead of CRUD.
**Charge** empowers a sigil with an emotion; **Destroy** completes it and
frees the slot. Both are full-screen, dark, touch-first experiences.

## User stories
- Charging: I pick an emotion (Hope, Grief, Relief, Joy, Longing), then trace
  my sigil while colored fluid light follows my finger; after ~5s of
  interaction the ritual completes and my sigil is marked charged with that emotion.
- Destroying: I pick an emotion, the evil eye watches my cursor/finger, a
  ghost trail follows my touch; on completion the sigil's status flips to
  DESTROYED, my destroy count increments, and the slot frees.

## Components & routes
- `charge-sigil/[sigilId]/page.tsx` → `charge/ChargeRitual` +
  `charge/EmotionPicker` + `charge/SplashCursor` (WebGL fluid sim).
- `destroy-sigil/[sigilId]/page.tsx` → `destroy/DestroyRitual` +
  `charge/EmotionPicker` (shared) + `destroy/EvilEye` (OGL) +
  `destroy/GhostCursor`.
- Both pages are client components (ARCHITECTURE.md exception list).

## API / data
- `PATCH /api/sigils/[id]/charge` — `{emotion}` → isCharged + chargedEmotion.
- `DELETE /api/sigils/[id]` — status → DESTROYED (owner only).
- Emotion → color mapping lives in one place (`types/index.ts` EMOTIONS const)
  and is shared by picker, fluid sim, and sigil page display.

## v1 reference (`main`)
`src/components/SigilRoomHome/ChargeSigil/**` (SplashCursor is a complete
WebGL fluid implementation — port, don't rewrite),
`DestroySigil/**` (EvilEye OGL shader, Perlin noise, GhostCursor).

## Acceptance criteria
- [ ] 60fps on a mid-range phone for both rituals (degrade particle count, not framerate).
- [ ] Ritual completion is explicit (progress/portal), not just a 5s timer the user doesn't perceive.
- [ ] chargedEmotion persists and displays on the sigil page.
- [ ] Destroy is irreversible in UI and guarded by a confirm step in-fiction.

## Open questions
- Can a sigil be re-charged with a different emotion? (v1: charge was one-way boolean. Lean: yes, re-charge overwrites emotion — more engagement.)
- Does community destroy-score ever auto-destroy? (v1: no. Keep no for launch; revisit as a social mechanic.)
- Destroy ritual done-state should leave room for the post-launch "closed
  case file" print offer (physical memento of the destroyed sigil — see
  features/monetization.md). No build needed at M5; just don't design the
  ending as a dead-end screen.
