/**
 * /api/sigils — the sigil collection.
 * STATUS: implemented (GET only; POST is M2)
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
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ok, err, notImplemented } from "@/lib/api";
import type { MapSigil } from "@/lib/mapbox";

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

export async function POST() {
  return notImplemented("POST /api/sigils");
}
