# M6 Plan — Tutorial (Harper & Bennet)

**Spec:** [../features/tutorial.md](../features/tutorial.md) ·
**Local-first (ADR-009):** completion persists to localStorage
(`sigilife:tutorial-complete`) until the DB stores `hasCompletedTutorial`.
**Exit:** a first-time visitor to /home is greeted by Harper & Bennet, walked
through the loop, and never sees it again once completed (skippable anytime).

## Scope decision (built unseen — favor robustness)
- **Centered/bottom-sheet overlay, NOT anchored spotlight.** Spotlight
  cutouts over specific elements need pixel-accurate positioning that can't be
  verified without eyes; a centered speech panel works on any screen. Anchored
  per-step hints are a documented follow-up requiring visual tuning.
- **Trigger: first /home visit.** The front door is the robust hook. Per-page
  step gating (advance when the user performs an action) is deferred with the
  spotlight work.
- Voice ported from v1 (`git show main:src/components/Tutorial/Tutorialscript.ts`).

## Tasks
1. `components/tutorial/tutorialScript.ts` — TutorialStep[] (speaker
   harper|bennet|both, text, ~6 intro steps covering recruit → write → charge
   → destroy → grimoire).
2. `context/TutorialProvider.tsx` — completed flag (localStorage), step index,
   next/skip/complete; renders children + overlay. Mounted in (app)/layout.
3. `components/tutorial/TutorialCharacter.tsx` — Harper/Bennet portrait
   (public/art/HarperPortrait.svg, BennetPortrait.svg) + nameplate.
4. `components/tutorial/TutorialOverlay.tsx` — dimmed backdrop, character(s) +
   speech, Next/Skip; renders only when !completed && pathname === "/home".
5. Settings: add "Replay introduction" (clears the flag).

## Verification
- typecheck/lint/build clean.
- Smoke: first /home shows overlay; Next advances; Skip/finish sets the flag;
  reload → no overlay; Settings replay → overlay returns.
- Honest flag in morning notes: visuals (portrait sizing, speech layout,
  mobile bottom-sheet) need a real device pass.

## Done = ROADMAP M6 row updated; anchored per-step spotlight noted as follow-up.
