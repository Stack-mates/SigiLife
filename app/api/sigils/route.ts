/**
 * /api/sigils — the sigil collection.
 * STATUS: implemented
 *
 * GET  (M4): list sigils. Query: scope=all|mine (default mine),
 *   status=active|destroyed (default active). Returns scores, location,
 *   owner summary — shaped for feed/map/library as MapSigil[].
 *   scope=all returns only placed sigils (lat/lng non-null).
 * POST (M2): create from the wizard draft (createSigilSchema in
 *   lib/validation). Server-side: profanity filter (BAD_WORDS_API_KEY),
 *   slot check via lib/entitlements (LIMIT_REACHED), create Sigil +
 *   SigilShare rows + sigilCount++ in one transaction.
 *
 * v1 reference: git show main:server/routes/sigil.routes.ts
 * @see docs/API_CONTRACT.md, docs/features/map.md, docs/features/make-sigil.md
 */
import { type NextRequest } from "next/server";
import type { Sigil as PrismaSigil } from "@prisma/client";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ok, err, requireViewer, parse } from "@/lib/api";
import { createSigilSchema } from "@/lib/validation";
import { canCreateSigil } from "@/lib/entitlements";
import { DEFAULT_STYLE, type SigilStatus, type SigilView } from "@/lib/sigil/types";
import type { SigilStyle } from "@/context/MakeSigilProvider";
import type { EmotionKey } from "@/types";
import type { MapSigil } from "@/lib/mapbox";

/** Map a Prisma sigil row to the UI-facing SigilView (same shape as lib/sigil/actions). */
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

/**
 * Best-effort profanity check on the intention text. Uses the PurgoMalum-style
 * BAD_WORDS_API_KEY service if configured. Network/parse failures, a missing
 * key, or empty text NEVER block creation — returns false (not profane) on any
 * problem so an unreachable API can't break the ritual.
 */
async function isProfane(text: string | undefined): Promise<boolean> {
  const key = process.env.BAD_WORDS_API_KEY;
  if (!key || !text || text.trim() === "") return false;
  try {
    const res = await fetch(
      `https://api.api-ninjas.com/v1/profanityfilter?text=${encodeURIComponent(text)}`,
      { headers: { "X-Api-Key": key } },
    );
    if (!res.ok) return false;
    const body = (await res.json()) as { has_profanity?: boolean };
    return body.has_profanity === true;
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const scope = searchParams.get("scope") ?? "mine";
    const statusParam = (searchParams.get("status") ?? "active").toUpperCase();
    const sigilStatus = statusParam === "DESTROYED" ? "DESTROYED" : "ACTIVE";

    const userId = await getCurrentUserId();

    if (scope === "mine") {
      const sigils = await prisma.sigil.findMany({
        where: { userId, status: sigilStatus },
        include: { user: { select: { username: true } } },
        orderBy: { createdAt: "desc" },
      });

      const data: MapSigil[] = sigils.map((s) => ({
        id: s.id,
        name: s.name,
        imageDataUrl: s.imageData ?? null,
        lat: s.latitude ? Number(s.latitude) : 0,
        lng: s.longitude ? Number(s.longitude) : 0,
        chargeScore: s.chargeScore,
        destroyScore: s.destroyScore,
        ownerUsername: s.user.username ?? null,
      }));

      return ok(data);
    }

    if (scope === "all") {
      // For the world map: only return placed sigils with valid lat/lng
      const sigils = await prisma.sigil.findMany({
        where: {
          status: "ACTIVE",
          latitude: { not: null },
          longitude: { not: null },
        },
        include: { user: { select: { username: true } } },
        orderBy: { createdAt: "desc" },
      });

      const data: MapSigil[] = sigils.map((s) => ({
        id: s.id,
        name: s.name,
        imageDataUrl: s.imageData ?? null,
        lat: Number(s.latitude),
        lng: Number(s.longitude),
        chargeScore: s.chargeScore,
        destroyScore: s.destroyScore,
        ownerUsername: s.user.username ?? null,
      }));

      return ok(data);
    }

    return err("VALIDATION", `Unknown scope "${scope}". Use "all" or "mine".`);
  } catch (e) {
    console.error("GET /api/sigils error:", e);
    return err("INTERNAL", "Failed to fetch sigils.");
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await requireViewer();

    const json = await request.json().catch(() => null);
    const parsed = parse(createSigilSchema, json);
    if (!parsed.ok) return parsed.response;
    const input = parsed.data;

    // Slot check: only ACTIVE sigils count against the user's caseload.
    const hasSlot = await canCreateSigil(userId);
    if (!hasSlot) {
      return err(
        "LIMIT_REACHED",
        "No free sigil slots — destroy one or expand your caseload",
      );
    }

    // Best-effort profanity gate; never blocks creation if the service errors.
    if (await isProfane(input.intention)) {
      return err("VALIDATION", "Your intention contains language we can't inscribe.");
    }

    // Resolve which of the requested share targets the user actually follows.
    let shareTargetIds: string[] = [];
    if (input.shareWith && input.shareWith.length > 0) {
      const requested = Array.from(new Set(input.shareWith)).filter((id) => id !== userId);
      if (requested.length > 0) {
        const follows = await prisma.follow.findMany({
          where: { followerId: userId, followingId: { in: requested } },
          select: { followingId: true },
        });
        shareTargetIds = follows.map((f) => f.followingId);
      }
    }

    const created = await prisma.$transaction(async (tx) => {
      const sigil = await tx.sigil.create({
        data: {
          userId,
          name: input.name,
          intention: input.intention ?? null,
          style: (input.style as object) ?? undefined,
          canvasData: (input.canvasData as object) ?? undefined,
          imageData: input.imageData ?? undefined,
          locationName: input.locationName ?? undefined,
          latitude: input.latitude ?? undefined,
          longitude: input.longitude ?? undefined,
          status: "ACTIVE",
        },
      });

      if (shareTargetIds.length > 0) {
        await tx.sigilShare.createMany({
          data: shareTargetIds.map((targetId) => ({ sigilId: sigil.id, userId: targetId })),
          skipDuplicates: true,
        });
      }

      await tx.user.update({
        where: { id: userId },
        data: { sigilCount: { increment: 1 } },
      });

      return sigil;
    });

    return ok(toView(created), { status: 201 });
  } catch (e) {
    console.error("POST /api/sigils error:", e);
    return err("INTERNAL", "Failed to create sigil.");
  }
}
