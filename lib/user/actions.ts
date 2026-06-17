"use server";

/**
 * User data layer — server actions for the viewer's own profile and the
 * received-shares ("scrying") feed. Database-backed, scoped to the current
 * user via the lib/auth dev shim (swaps to real auth later, callers unchanged).
 * STATUS: implemented
 *
 * Counts come from real Sigil rows, NOT the denormalized User.sigilCount /
 * destroyCount counters, which aren't reliably maintained across every
 * create/destroy path (and predate them for existing rows).
 *
 * @see docs/DATA_MODEL.md, docs/features/grimoire.md, docs/features/social.md
 */
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";
import type { MyProfile, SharedSigil } from "@/types";

type HomeLocation = { lat: number; lng: number; name: string };

function toHomeLocation(value: Prisma.JsonValue | null): HomeLocation | null {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const v = value as Record<string, unknown>;
    if (typeof v.lat === "number" && typeof v.lng === "number" && typeof v.name === "string") {
      return { lat: v.lat, lng: v.lng, name: v.name };
    }
  }
  return null;
}

/** The viewer's own profile with a live, accurate sigil/ritual breakdown. */
export async function getMyProfile(): Promise<MyProfile> {
  const userId = await getCurrentUserId();

  const [user, followerCount, followingCount, crafted, active, charged, closed] =
    await Promise.all([
      prisma.user.findUniqueOrThrow({
        where: { id: userId },
        select: { id: true, username: true, avatar: true, homeLocation: true },
      }),
      prisma.follow.count({ where: { followingId: userId } }),
      prisma.follow.count({ where: { followerId: userId } }),
      prisma.sigil.count({ where: { userId } }),
      prisma.sigil.count({ where: { userId, status: "ACTIVE" } }),
      prisma.sigil.count({ where: { userId, status: "ACTIVE", isCharged: true } }),
      prisma.sigil.count({ where: { userId, status: "DESTROYED" } }),
    ]);

  return {
    id: user.id,
    username: user.username,
    avatar: user.avatar,
    homeLocation: toHomeLocation(user.homeLocation),
    sigilCount: crafted, // real count, not the stale denormalized counter
    destroyCount: closed,
    followerCount,
    followingCount,
    activeCount: active,
    chargedCount: charged,
  };
}

/**
 * Sigils other people have shared with the viewer (the SigiLites of those
 * sigils), newest first. Only ACTIVE sigils surface — a destroyed sigil's
 * work is done, so it drops out of the mirror.
 */
export async function listSharedWithMe(): Promise<SharedSigil[]> {
  const userId = await getCurrentUserId();

  const shares = await prisma.sigilShare.findMany({
    where: { userId, sigil: { status: "ACTIVE" } },
    orderBy: { createdAt: "desc" },
    select: {
      createdAt: true,
      sigil: {
        select: {
          id: true,
          name: true,
          imageData: true,
          user: { select: { username: true, avatar: true } },
        },
      },
    },
  });

  return shares.map((s) => ({
    id: s.sigil.id,
    name: s.sigil.name,
    imageDataUrl: s.sigil.imageData ?? null,
    ownerUsername: s.sigil.user.username,
    ownerAvatar: s.sigil.user.avatar,
    sharedAt: s.createdAt.toISOString(),
  }));
}
