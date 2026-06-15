/**
 * /api/users — user search.
 * STATUS: implemented
 *
 * GET (M3): ?q=<username prefix> → UserSummary[] (id, username, avatar,
 * follow state relative to viewer). Min query length 2; excludes self.
 *
 * v1 reference: git show main:server/routes/user.routes.ts (search)
 * @see docs/API_CONTRACT.md, docs/features/social.md
 */
import { type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ok, err, parse, requireViewer } from "@/lib/api";
import { userSearchSchema } from "@/lib/validation";
import type { UserSummary } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const viewerId = await requireViewer();

    const parsed = parse(userSearchSchema, {
      q: request.nextUrl.searchParams.get("q") ?? undefined,
    });
    if (!parsed.ok) return parsed.response;

    const { q } = parsed.data;

    // Username prefix search, case-insensitive, excluding the viewer.
    const users = await prisma.user.findMany({
      where: {
        id: { not: viewerId },
        username: { startsWith: q, mode: "insensitive" },
      },
      select: { id: true, username: true, avatar: true },
      orderBy: { username: "asc" },
      take: 20,
    });

    // Which of these results does the viewer already follow? One lookup.
    const ids = users.map((u) => u.id);
    const follows = ids.length
      ? await prisma.follow.findMany({
          where: { followerId: viewerId, followingId: { in: ids } },
          select: { followingId: true },
        })
      : [];
    const followingSet = new Set(follows.map((f) => f.followingId));

    const data: UserSummary[] = users.map((u) => ({
      id: u.id,
      username: u.username,
      avatar: u.avatar,
      isFollowing: followingSet.has(u.id),
    }));

    return ok(data);
  } catch (e) {
    console.error("GET /api/users error:", e);
    return err("INTERNAL", "Failed to search users.");
  }
}
