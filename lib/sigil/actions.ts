"use server";

/**
 * Sigil data layer — server actions, the database-backed replacement for the
 * old client-side localStore. Same function names/shapes so components swap
 * sync local calls for awaited server calls with minimal change.
 * STATUS: implemented
 *
 * Every action scopes to the current user (lib/auth dev-identity shim until
 * real auth). Destruction is a status flip, never a row delete (GLOSSARY).
 *
 * @see docs/DATA_MODEL.md, docs/API_CONTRACT.md, docs/features/grimoire.md
 */
import type { Sigil as PrismaSigil } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";
import type { EmotionKey } from "@/types";
import {
  DEFAULT_STYLE,
  type SigilStatus,
  type SigilView,
  type VoteState,
  type VoteType,
} from "@/lib/sigil/types";
import type { SigilStyle } from "@/context/MakeSigilProvider";

function toView(s: PrismaSigil): SigilView {
  return {
    id: s.id,
    name: s.name,
    intention: s.intention ?? "",
    style: (s.style as SigilStyle | null) ?? DEFAULT_STYLE,
    canvasJson: (s.canvasData as unknown) ?? null,
    imageDataUrl: s.imageData ?? null,
    status: s.status as SigilStatus,
    isCharged: s.isCharged,
    chargedEmotion: (s.chargedEmotion as EmotionKey | null) ?? undefined,
    chargeScore: s.chargeScore,
    destroyScore: s.destroyScore,
    finishedAt: s.createdAt.toISOString(),
    destroyedAt: s.destroyedAt?.toISOString(),
  };
}

export async function listSigils(status?: SigilStatus): Promise<SigilView[]> {
  const userId = await getCurrentUserId();
  const rows = await prisma.sigil.findMany({
    where: { userId, ...(status ? { status } : {}) },
    orderBy: { createdAt: "desc" },
  });
  return rows.map(toView);
}

export async function getSigil(id: string): Promise<SigilView | null> {
  const userId = await getCurrentUserId();
  const row = await prisma.sigil.findFirst({ where: { id, userId } });
  return row ? toView(row) : null;
}

// Create and rename now live solely on the REST API (POST /api/sigils,
// PATCH /api/sigils/[id]) so web + mobile share one authoritative path
// (A4, ADR-016). The former keepSigil/renameSigil server actions were removed.

export async function chargeSigil(id: string, emotion: EmotionKey): Promise<SigilView | null> {
  const userId = await getCurrentUserId();
  const existing = await prisma.sigil.findFirst({ where: { id, userId } });
  if (!existing || existing.status === "DESTROYED") return existing ? toView(existing) : null;
  const row = await prisma.sigil.update({
    where: { id },
    data: { isCharged: true, chargedEmotion: emotion },
  });
  return toView(row);
}

export async function destroySigil(id: string): Promise<SigilView | null> {
  const userId = await getCurrentUserId();
  const existing = await prisma.sigil.findFirst({ where: { id, userId } });
  if (!existing) return null;
  if (existing.status === "DESTROYED") return toView(existing);
  const row = await prisma.sigil.update({
    where: { id },
    data: { status: "DESTROYED", destroyedAt: new Date() },
  });
  return toView(row);
}

export async function clearAllSigils(): Promise<void> {
  const userId = await getCurrentUserId();
  await prisma.sigil.deleteMany({ where: { userId } });
}

/** The viewer's current vote on a sigil, if any. */
export async function getViewerVote(sigilId: string): Promise<VoteType | null> {
  const userId = await getCurrentUserId();
  const vote = await prisma.sigilVote.findUnique({
    where: { sigilId_userId: { sigilId, userId } },
  });
  return (vote?.voteType as VoteType | undefined) ?? null;
}

/**
 * Cast/toggle a community vote. Toggle semantics in one transaction:
 * same vote again retracts it; opposite vote switches; none creates. Then
 * recompute the denormalized scores from the actual rows.
 */
export async function voteSigil(sigilId: string, type: VoteType): Promise<VoteState> {
  const userId = await getCurrentUserId();

  return prisma.$transaction(async (tx) => {
    const existing = await tx.sigilVote.findUnique({
      where: { sigilId_userId: { sigilId, userId } },
    });

    if (!existing) {
      await tx.sigilVote.create({ data: { sigilId, userId, voteType: type } });
    } else if (existing.voteType === type) {
      await tx.sigilVote.delete({ where: { id: existing.id } }); // retract
    } else {
      await tx.sigilVote.update({ where: { id: existing.id }, data: { voteType: type } });
    }

    const [chargeScore, destroyScore] = await Promise.all([
      tx.sigilVote.count({ where: { sigilId, voteType: "CHARGE" } }),
      tx.sigilVote.count({ where: { sigilId, voteType: "DESTROY" } }),
    ]);
    await tx.sigil.update({ where: { id: sigilId }, data: { chargeScore, destroyScore } });

    const viewer = await tx.sigilVote.findUnique({
      where: { sigilId_userId: { sigilId, userId } },
    });
    return { chargeScore, destroyScore, viewerVote: (viewer?.voteType as VoteType | undefined) ?? null };
  });
}
