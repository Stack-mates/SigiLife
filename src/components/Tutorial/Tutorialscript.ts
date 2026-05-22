export type TutorialPage = 'write' | 'draw' | 'style' | 'charge' | 'done';
export type Speaker = 'harper' | 'bennet' | 'both' | 'floating';

export interface TutorialStep {
  id: number;
  page: TutorialPage;
  speaker: Speaker;
  harperText?: string;
  bennetText?: string;
  floatingText?: string;
  advanceOn: 'next' | 'action';
  actionHint?: string;
  skippable: boolean;
  showOverlay: boolean;
}

export const TUTORIAL_STEPS: TutorialStep[] = [

  // ── WriteSigil ──────────────────────────────────────────────────────────────
  {
    id: 1,
    page: 'write',
    speaker: 'harper',
    harperText: 'Hey, you made it! Not everyone notices when we try to reach them.  A mark, a pattern, a feeling that sticks, and suddenly you have access!',
    advanceOn: 'next',
    skippable: false,
    showOverlay: true,
  },
  {
    id: 2,
    page: 'write',
    speaker: 'both',
    harperText: "I'm Harper Crowe, and this is Bennet Voss. We're senior agents here at The Office. We deal in sigils. That thing you found… or felt.",
    bennetText: "That's where you are now. The Office doesn't send invitations. Consider yourself recruited!",
    advanceOn: 'next',
    skippable: false,
    showOverlay: true,
  },
  {
    id: 3,
    page: 'write',
    speaker: 'both',
    harperText: "What you write becomes the backbone of the mark. If it's weak, the Sigil won't hold. Once the words are set, you shape it.",
    bennetText: "Start with the statement. Keep it precise. Direct. No filler, this isn't journaling. When you are done typing, click 'Draw Sigil'",
    advanceOn: 'action',
    actionHint: "Write your intention, then click Draw Sigil when you're ready.",
    skippable: false,
    showOverlay: false,
  },

  // ── DrawSigil ────────────────────────────────────────────────────────────────
  {
    id: 4,
    page: 'draw',
    speaker: 'harper',
    harperText: "Make sure to name your new sigil, or it will default to My New Sigil. Adjust the lettering. Resize as large as possible! Draw Mode will let you draw. Use Delete, Undo, Redo & Clear All",
    advanceOn: 'next',
    skippable: true,
    showOverlay: false, 
  },
  {
    id: 5,
    page: 'draw',
    speaker: 'bennet',
    bennetText: "These aren't decorations — they're focus. The clearer the form, the easier it is for others to read… and react. When you're ready, click Style Sigil.",
    advanceOn: 'next',
    skippable: true,
    showOverlay: false,
  },

  // ── StyleSigil ───────────────────────────────────────────────────────────────
  {
    id: 6,
    page: 'style',
    speaker: 'both',
    harperText: "Looks good.",
    bennetText: "It does. Enjoy that feeling. It doesn't last forever.",
    advanceOn: 'next',
    skippable: true,
    showOverlay: false,
  },
  {
    id: 7,
    page: 'style',
    speaker: 'bennet',
    bennetText: "Next, choose a location. For now, you'll place it on the map. As your clearance improves, you'll be able to deploy it into the world: street level.",
    advanceOn: 'next',
    skippable: true,
    showOverlay: false,
  },
  {
    id: 8,
    page: 'style',
    speaker: 'harper',
    harperText: "Before you send it out, add your SigiLites, people on your team you trust to back you up. If you don't have any yet, don't worry. You can search for friends later under SigiLites in the Navigation Menu!",
    advanceOn: 'next',
    skippable: true,
    showOverlay: false,
  },
  {
    id: 9,
    page: 'style',
    speaker: 'bennet',
    bennetText: "Once your Sigil is placed, other agents can find it. Some will agree with you. Others won't.  You'll get familiar with that on the SigilMap.",
    advanceOn: 'next',
    skippable: true,
    showOverlay: false,
  },

  // ── ChargeSigil ──────────────────────────────────────────────────────────────
  {
    id: 10,
    page: 'style',
    speaker: 'harper',
    harperText: "You can charge a Sigil with emotion. When you reinforce a mark, you're feeding it momentum. When you are done with your sigil, destroy them completely.",
    advanceOn: 'next',
    skippable: true,
    showOverlay: false,
  },
  {
    id: 11,
    page: 'style',
    speaker: 'both',
    harperText: "On the SigiMap, you can choose to build sigils with your power. There's an activity feed to keep an eye on your sigils and teammates",
    bennetText: "You can also do the opposite and tear it down by attacking it. That's not always a bad thing. Some marks shouldn't last.",
    advanceOn: 'next',
    skippable: true,
    showOverlay: false,
  },
  {
    id: 12,
    page: 'style',
    speaker: 'both',
    harperText: " Go Play with your fireplace & your altar in the office. Choose your team, and back them!",
    bennetText: "Charge, place, and Destroy your Sigils carefully.Every Sigil carries both forces. Use them wisely!",
    advanceOn: 'next',
    skippable: true,
    showOverlay: false,
  },
  {
    id: 13,
    page: 'style',
    speaker: 'both',
    harperText: "Remember, every Sigil has consequence for it's SigiLites!",
    bennetText: "And when you see a Sigil in the world… decide whether you're going to help build or attack it.",
    advanceOn: 'next',
    skippable: true,
    showOverlay: false,
  },
  {
    id: 14,
    page: 'style',
    speaker: 'both',
    harperText: "Good luck! Can't wait to see you out there!",
    bennetText: "We all need it.",
    advanceOn: 'action',
    actionHint: "Save your sigil to complete this.",
    skippable: true,
    showOverlay: false,
  },
];

export const STEPS_FOR_PAGE = (page: TutorialPage) =>
  TUTORIAL_STEPS.filter(s => s.page === page);

export const SESSION_KEY = 'sigilTutorialStep';

export function getTutorialStepFromSession(): number {
  const val = sessionStorage.getItem(SESSION_KEY);
  return val ? parseInt(val, 10) : 1;
}

export function saveTutorialStepToSession(stepId: number) {
  sessionStorage.setItem(SESSION_KEY, String(stepId));
}

export function clearTutorialSession() {
  sessionStorage.removeItem(SESSION_KEY);
}