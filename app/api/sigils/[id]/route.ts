/**
 * /api/sigils/[id] — one sigil.
 * STATUS: implemented (GET + PATCH; DELETE is M3)
 *
 * GET    (M4): public sigil details for map popup — chargeScore, destroyScore,
 *              owner username. Returns 404 if not found or DESTROYED.
 * PATCH  (M4): owner only — name and/or location (updateSigilSchema).
 * DELETE (M3): owner only — the DESTROY lifecycle, not a row delete:
 *   status → DESTROYED, destroyedAt, destroyCount++, slot freed (transaction).
 *   Hard delete is admin-only.
 *
 * v1 reference: git show main:server/routes/sigil.routes.ts
 * @see docs/API_CONTRACT.md, docs/features/grimoire.md, docs/features/map.md
 */
import { type NextRequest } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ok, err, notImplemented } from "@/lib/api";
import { updateSigilSchema } from "@/lib/validation";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const sigil = await prisma.sigil.findUnique({
      where: { id },
      include: { user: { select: { username: true } } },
    });

    if (!sigil || sigil.status === "DESTROYED") {
      return err("NOT_FOUND", "Sigil not found.");
    }

    const data = {
      id: sigil.id,
      name: sigil.name,
      intention: sigil.intention ?? null,
      style: sigil.style,
      canvasJson: sigil.canvasData ?? null,
      imageDataUrl: sigil.imageData ?? null,
      status: sigil.status as "ACTIVE" | "DESTROYED",
      isCharged: sigil.isCharged,
      chargedEmotion: sigil.chargedEmotion ?? undefined,
      chargeScore: sigil.chargeScore,
      destroyScore: sigil.destroyScore,
      locationName: sigil.locationName ?? null,
      latitude: sigil.latitude ? Number(sigil.latitude) : null,
      longitude: sigil.longitude ? Number(sigil.longitude) : null,
      ownerUsername: sigil.user.username ?? null,
      finishedAt: sigil.createdAt.toISOString(),
      destroyedAt: sigil.destroyedAt?.toISOString(),
    };

    return ok(data);
  } catch (e) {
    console.error("GET /api/sigils/[id] error:", e);
    return err("INTERNAL", "Failed to fetch sigil.");
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = await getCurrentUserId();

    const sigil = await prisma.sigil.findUnique({ where: { id } });
    if (!sigil) return err("NOT_FOUND", "Sigil not found.");
    if (sigil.userId !== userId) return err("FORBIDDEN", "Not your sigil.");

    const body: unknown = await request.json();
    const parsed = updateSigilSchema.safeParse(body);
    if (!parsed.success) {
      return err("VALIDATION", parsed.error.issues.map((i) => i.message).join("; "));
    }

    const { name, locationName, latitude, longitude } = parsed.data;

    const updated = await prisma.sigil.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(locationName !== undefined && { locationName }),
        ...(latitude !== undefined && { latitude }),
        ...(longitude !== undefined && { longitude }),
      },
      include: { user: { select: { username: true } } },
    });

    const data = {
      id: updated.id,
      name: updated.name,
      intention: updated.intention ?? null,
      style: updated.style,
      canvasJson: updated.canvasData ?? null,
      imageDataUrl: updated.imageData ?? null,
      status: updated.status as "ACTIVE" | "DESTROYED",
      isCharged: updated.isCharged,
      chargedEmotion: updated.chargedEmotion ?? undefined,
      chargeScore: updated.chargeScore,
      destroyScore: updated.destroyScore,
      locationName: updated.locationName ?? null,
      latitude: updated.latitude ? Number(updated.latitude) : null,
      longitude: updated.longitude ? Number(updated.longitude) : null,
      ownerUsername: updated.user.username ?? null,
      finishedAt: updated.createdAt.toISOString(),
      destroyedAt: updated.destroyedAt?.toISOString(),
    };

    return ok(data);
  } catch (e) {
    console.error("PATCH /api/sigils/[id] error:", e);
    return err("INTERNAL", "Failed to update sigil.");
  }
}

export async function DELETE() {
  return notImplemented("DELETE /api/sigils/[id]");
}
