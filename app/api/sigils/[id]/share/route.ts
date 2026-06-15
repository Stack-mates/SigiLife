/**
 * /api/sigils/[id]/share — share a sigil with SigiFriends.
 * STATUS: implemented
 *
 * POST (M3): owner only. Body {userIds} (shareSchema). Validates each target
 * is someone the owner follows; upserts SigilShare rows (the SigiLites).
 * Replaces v1's POST /share + denormalized SigilGroup.
 *
 * v1 reference: git show main:server/routes/sigil.routes.ts (share endpoint)
 * @see docs/API_CONTRACT.md, docs/features/social.md
 */
import { type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ok, err, requireViewer, parse } from "@/lib/api";
import { shareSchema } from "@/lib/validation";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const viewer = await requireViewer();

    // Owner-only: the sigil must exist and belong to the viewer.
    const sigil = await prisma.sigil.findUnique({ where: { id } });
    if (!sigil) return err("NOT_FOUND", "Sigil not found.");
    if (sigil.userId !== viewer) return err("FORBIDDEN", "Not your sigil.");

    const body: unknown = await request.json().catch(() => null);
    const parsed = parse(shareSchema, body);
    if (!parsed.ok) return parsed.response;

    // De-dupe requested targets; the owner cannot share with themselves.
    const requestedIds = [...new Set(parsed.data.userIds)];
    if (requestedIds.includes(viewer)) {
      return err("VALIDATION", "You can only share with people you follow");
    }

    // Only allow sharing with people the OWNER follows. Resolve which of the
    // requested ids the owner actually follows; if any are not followed,
    // reject the whole request (no partial shares).
    const follows = await prisma.follow.findMany({
      where: { followerId: viewer, followingId: { in: requestedIds } },
      select: { followingId: true },
    });
    const followedIds = new Set(follows.map((f) => f.followingId));
    if (followedIds.size !== requestedIds.length) {
      return err("VALIDATION", "You can only share with people you follow");
    }

    // Upsert each SigilShare (unique on sigilId + userId) so re-sharing is
    // idempotent and returns the existing/created row.
    const shares = await prisma.$transaction(
      requestedIds.map((userId) =>
        prisma.sigilShare.upsert({
          where: { sigilId_userId: { sigilId: id, userId } },
          update: {},
          create: { sigilId: id, userId },
        })
      )
    );

    return ok(shares);
  } catch (e) {
    console.error("POST /api/sigils/[id]/share error:", e);
    return err("INTERNAL", "Failed to share sigil.");
  }
}
