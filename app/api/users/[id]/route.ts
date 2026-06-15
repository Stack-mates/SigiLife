/**
 * /api/users/[id] — one user.
 * STATUS: implemented
 *
 * GET    (M3): public profile — username, avatar, counts, follow state.
 * PATCH  (M1): self only (updateUserSchema): username (unique → CONFLICT),
 *   avatar, theme, colorTheme, homeLocation, hasCompletedTutorial.
 *   This is also the onboarding completion call from /create-profile.
 * DELETE (M1): self only — account deletion, prisma cascades handle the rest.
 *   Confirm flow lives in settings UI.
 *
 * v1 reference: git show main:server/routes/user.routes.ts
 * @see docs/API_CONTRACT.md, docs/features/auth.md
 */
import { type NextRequest } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ok, err, requireViewer, parse } from "@/lib/api";
import { updateUserSchema } from "@/lib/validation";
import type { ProfileData } from "@/types";

type HomeLocation = { lat: number; lng: number; name: string };

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const viewerId = await requireViewer();

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        avatar: true,
        sigilCount: true,
        destroyCount: true,
        homeLocation: true,
      },
    });

    if (!user) return err("NOT_FOUND", "User not found.");

    const [followerCount, followingCount, viewerFollow] = await Promise.all([
      prisma.follow.count({ where: { followingId: id } }),
      prisma.follow.count({ where: { followerId: id } }),
      viewerId === id
        ? Promise.resolve(null)
        : prisma.follow.findUnique({
            where: { followerId_followingId: { followerId: viewerId, followingId: id } },
          }),
    ]);

    const data: ProfileData = {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      sigilCount: user.sigilCount,
      destroyCount: user.destroyCount,
      homeLocation: (user.homeLocation as HomeLocation | null) ?? null,
      followerCount,
      followingCount,
      isFollowing: viewerId === id ? false : viewerFollow !== null,
    };

    return ok(data);
  } catch (e) {
    console.error("GET /api/users/[id] error:", e);
    return err("INTERNAL", "Failed to fetch user.");
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const viewerId = await requireViewer();

    if (id !== viewerId) return err("FORBIDDEN", "You can only edit your own profile.");

    const body: unknown = await request.json();
    const parsed = parse(updateUserSchema, body);
    if (!parsed.ok) return parsed.response;

    const { username, avatar, theme, colorTheme, homeLocation, hasCompletedTutorial } =
      parsed.data;

    try {
      const updated = await prisma.user.update({
        where: { id },
        data: {
          ...(username !== undefined && { username }),
          ...(avatar !== undefined && { avatar }),
          ...(theme !== undefined && { theme }),
          ...(colorTheme !== undefined && { colorTheme }),
          ...(homeLocation !== undefined && { homeLocation: homeLocation ?? Prisma.JsonNull }),
          ...(hasCompletedTutorial !== undefined && { hasCompletedTutorial }),
        },
        select: {
          id: true,
          username: true,
          avatar: true,
          theme: true,
          colorTheme: true,
          homeLocation: true,
          hasCompletedTutorial: true,
          sigilCount: true,
          destroyCount: true,
        },
      });

      const data = {
        id: updated.id,
        username: updated.username,
        avatar: updated.avatar,
        theme: updated.theme,
        colorTheme: updated.colorTheme,
        homeLocation: (updated.homeLocation as HomeLocation | null) ?? null,
        hasCompletedTutorial: updated.hasCompletedTutorial,
        sigilCount: updated.sigilCount,
        destroyCount: updated.destroyCount,
      };

      return ok(data);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
        return err("CONFLICT", "That name is taken");
      }
      throw e;
    }
  } catch (e) {
    console.error("PATCH /api/users/[id] error:", e);
    return err("INTERNAL", "Failed to update profile.");
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const viewerId = await requireViewer();

    if (id !== viewerId) return err("FORBIDDEN", "You can only delete your own account.");

    // Cascades (Account, Session, Sigil, votes, follows, shares, …) are handled
    // by onDelete: Cascade in the schema.
    await prisma.user.delete({ where: { id } });

    return ok({ deleted: true });
  } catch (e) {
    console.error("DELETE /api/users/[id] error:", e);
    return err("INTERNAL", "Failed to delete account.");
  }
}
