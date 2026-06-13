/**
 * tutorialScript — the intro sequence delivered by Harper & Bennet.
 * STATUS: implemented (intro on first /home visit; per-page anchored steps
 * are a documented follow-up — see docs/plans/M6-tutorial.md)
 *
 * Voice ported/condensed from v1 (git show main:src/components/Tutorial/Tutorialscript.ts).
 * @see docs/features/tutorial.md, docs/GLOSSARY.md
 */
export type Speaker = "harper" | "bennet" | "both";

export interface TutorialStep {
  speaker: Speaker;
  harper?: string;
  bennet?: string;
}

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    speaker: "harper",
    harper:
      "Hey — you made it. Not everyone notices when we try to reach them. A mark, a pattern, a feeling that sticks… and suddenly you have access.",
  },
  {
    speaker: "both",
    harper: "I'm Harper Crowe. This is Bennet Voss. Senior agents, here at The Office.",
    bennet: "The Office doesn't send invitations. Consider yourself recruited.",
  },
  {
    speaker: "harper",
    harper:
      "We deal in sigils. You start with an intention — write it plainly, no filler — and its letters become the bones of the mark. Then you shape it on the canvas.",
  },
  {
    speaker: "bennet",
    bennet:
      "Once it's drawn, you charge it. Pick a feeling and pour it in. The stronger the charge, the more the sigil holds.",
  },
  {
    speaker: "harper",
    harper:
      "And when its work is done, you destroy it. That's not loss — that's completion. A closed case. It frees you to make the next mark.",
  },
  {
    speaker: "both",
    harper: "Your grimoire keeps all of it — your library, your closed cases.",
    bennet: "Enough talk. Make your first mark. We'll be watching.",
  },
];
