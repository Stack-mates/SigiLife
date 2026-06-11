/**
 * Shared types & domain constants.
 * STATUS: stub
 *
 * What goes here (M1+):
 * - UserSummary / SigilSummary / MapSigil — the API response shapes
 *   (docs/API_CONTRACT.md), distinct from Prisma models (never leak full
 *   rows with imageData into list payloads).
 * - EMOTIONS: the single emotion → color/label map shared by EmotionPicker,
 *   SplashCursor, SigilRenderer, and the sigil page badge.
 * - Re-export Prisma enums (Emotion, VoteType, SigilStatus, ...) once
 *   `prisma generate` runs in M1.
 *
 * @see docs/GLOSSARY.md
 */

/** Emotion → ritual color. Single source — do not duplicate this map. */
export const EMOTIONS = {
  HOPE: { label: "Hope", color: "#ffd166" },
  GRIEF: { label: "Grief", color: "#3a5a8c" },
  RELIEF: { label: "Relief", color: "#7fd1ae" },
  JOY: { label: "Joy", color: "#ff7e6b" },
  LONGING: { label: "Longing", color: "#9e38fd" },
} as const;

export type EmotionKey = keyof typeof EMOTIONS;
