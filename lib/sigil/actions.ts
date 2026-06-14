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
  type NewSigilInput,
  type SigilStatus,
  type SigilView,
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

export async function keepSigil(input: NewSigilInput): Promise<SigilView> {
  const userId = await getCurrentUserId();
  const row = await prisma.sigil.create({
    data: {
      userId,
      name: input.name || "Unnamed sigil",
      intention: input.intention,
      style: input.style as object,
      canvasData: (input.canvasJson as object) ?? undefined,
      imageData: input.imageDataUrl ?? undefined,
      status: "ACTIVE",
    },
  });
  return toView(row);
}

export async function renameSigil(id: string, name: string): Promise<SigilView | null> {
  const userId = await getCurrentUserId();
  const existing = await prisma.sigil.findFirst({ where: { id, userId } });
  if (!existing) return null;
  const row = await prisma.sigil.update({
    where: { id },
    data: { name: name.slice(0, 100) || "Unnamed sigil" },
  });
  return toView(row);
}

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
