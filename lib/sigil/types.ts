/**
 * Sigil view type — the shape the UI consumes, decoupled from the Prisma row.
 * STATUS: implemented
 *
 * Mirrors the old StoredSigil shape so swapping the local store for the
 * database (server actions) is a near-mechanical change in components.
 * Never leak full Prisma rows to the client; map to this.
 *
 * @see docs/DATA_MODEL.md, docs/features/grimoire.md
 */
import type { SigilStyle } from "@/context/MakeSigilProvider";
import type { EmotionKey } from "@/types";

export type SigilStatus = "ACTIVE" | "DESTROYED";

export type SigilView = {
  id: string;
  name: string;
  intention: string;
  style: SigilStyle;
  canvasJson: unknown | null;
  imageDataUrl: string | null;
  status: SigilStatus;
  isCharged: boolean;
  chargedEmotion?: EmotionKey;
  chargeScore: number;
  destroyScore: number;
  /** ISO timestamp the sigil was created/kept. */
  finishedAt: string;
  /** ISO timestamp it was destroyed, if it has been. */
  destroyedAt?: string;
};

/** Input for creating a sigil (everything the make-sigil flow produces). */
export type NewSigilInput = {
  name: string;
  intention: string;
  style: SigilStyle;
  canvasJson: unknown | null;
  imageDataUrl: string | null;
};

export const DEFAULT_STYLE: SigilStyle = { color: "#e8e3d8", ring: false, glow: false };

export type VoteType = "CHARGE" | "DESTROY";

export type VoteState = {
  chargeScore: number;
  destroyScore: number;
  viewerVote: VoteType | null;
};
