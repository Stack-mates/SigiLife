/**
 * Shared types & domain constants.
 * STATUS: implemented (EMOTIONS + API response shapes; Prisma enum re-exports remain)
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

/** A user as it appears in lists (search results, follow lists). */
export type UserSummary = {
  id: string;
  username: string | null;
  avatar: number;
  isFollowing?: boolean;
  isFollower?: boolean;
};

/** A user's public profile page payload. */
export type ProfileData = {
  id: string;
  username: string | null;
  avatar: number;
  sigilCount: number;
  destroyCount: number;
  homeLocation: { lat: number; lng: number; name: string } | null;
  followerCount: number;
  followingCount: number;
  isFollowing?: boolean;
};

/** A sigil as it appears in lists/grids (never leaks full canvas/imageData rows). */
export type SigilSummary = {
  id: string;
  name: string;
  imageDataUrl: string | null;
  status: "ACTIVE" | "DESTROYED";
  isCharged: boolean;
  finishedAt: string;
};

/** Direction filter for follow-edge queries. */
export type FollowDirection = "followers" | "following" | "mutual";
