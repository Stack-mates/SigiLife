/**
 * /api/users/[id]/follows — the follow graph around a user.
 * STATUS: implemented
 *
 * GET    (M3): ?direction=followers|following|mutual → UserSummary[].
 *   "mutual" = SigiFriends (intersection, computed in the query).
 * POST   (M3): viewer follows [id]. Idempotent (unique constraint → no-op).
 * DELETE (M3): viewer unfollows [id].
 *
 * v1 reference: git show main:server/routes/user.routes.ts (follow endpoints)
 * @see docs/API_CONTRACT.md, docs/features/social.md
 */
import { ok, err, parse, requireViewer } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { followsQuerySchema } from "@/lib/validation";
import type { UserSummary } from "@/types";

const userSelect = { id: true, username: true, avatar: true } as const;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await requireViewer();

  const url = new URL(request.url);
  const parsed = parse(followsQuerySchema, {
    direction: url.searchParams.get("direction") ?? undefined,
  });
  if (!parsed.ok) return parsed.response;
  const { direction } = parsed.data;

  const target = await prisma.user.findUnique({
    where: { id },
    select: { id: true },
  });
  if (!target) return err("NOT_FOUND", "User not found");

  let users: UserSummary[];

  if (direction === "followers") {
    // Users who follow [id]: their id is the followerId on edges to [id].
    const edges = await prisma.follow.findMany({
      where: { followingId: id },
      select: { follower: { select: userSelect } },
      orderBy: { createdAt: "desc" },
    });
    users = edges.map((e) => e.follower);
  } else if (direction === "following") {
    // Users [id] follows: their id is the followingId on edges from [id].
    const edges = await prisma.follow.findMany({
      where: { followerId: id },
      select: { following: { select: userSelect } },
      orderBy: { createdAt: "desc" },
    });
    users = edges.map((e) => e.following);
  } else {
    // mutual (SigiFriends): people [id] follows who also follow [id] back.
    // A follows them (followerId=id) AND they follow A (their edge to id).
    const edges = await prisma.follow.findMany({
      where: {
        followerId: id,
        following: { following: { some: { followingId: id } } },
      },
      select: { following: { select: userSelect } },
      orderBy: { createdAt: "desc" },
    });
    users = edges.map((e) => e.following);
  }

  return ok(users);
}

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const viewerId = await requireViewer();

  if (id === viewerId) {
    return err("VALIDATION", "You cannot follow yourself");
  }

  const target = await prisma.user.findUnique({
    where: { id },
    select: { id: true },
  });
  if (!target) return err("NOT_FOUND", "User not found");

  // Idempotent: the @@unique([followerId, followingId]) makes this a no-op
  // for an existing edge.
  await prisma.follow.upsert({
    where: {
      followerId_followingId: { followerId: viewerId, followingId: id },
    },
    update: {},
    create: { followerId: viewerId, followingId: id },
  });

  return ok({ following: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const viewerId = await requireViewer();

  // deleteMany never errors when the edge is absent — naturally idempotent.
  await prisma.follow.deleteMany({
    where: { followerId: viewerId, followingId: id },
  });

  return ok({ following: false });
}
