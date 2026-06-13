/**
 * localStore — on-device sigil persistence until the DB lands (ADR-009).
 * STATUS: implemented
 *
 * THE SEAM: the grimoire UI talks only to these functions. When Postgres
 * arrives, this module's callers switch to API calls with the same shapes —
 * the UI contracts don't change. Destruction is a status flip, never a
 * delete (GLOSSARY: destroyed sigils are the record of finished work).
 *
 * Migrates v0 records (written by the first StyleSigil version, no id/status)
 * by assigning ids and ACTIVE status on read.
 *
 * @see docs/plans/M3-grimoire.md, docs/features/grimoire.md
 */
import type { SigilStyle } from "@/context/MakeSigilProvider";
import type { EmotionKey } from "@/types";

export type StoredSigilStatus = "ACTIVE" | "DESTROYED";

export type StoredSigil = {
  id: string;
  name: string;
  intention: string;
  style: SigilStyle;
  canvasJson: unknown | null;
  imageDataUrl: string | null;
  status: StoredSigilStatus;
  isCharged?: boolean;
  chargedEmotion?: EmotionKey;
  finishedAt: string;
  chargedAt?: string;
  destroyedAt?: string;
};

const KEY = "sigilife:finished-sigils";

function newId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `sigil-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}

function readAll(): StoredSigil[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    let migrated = false;
    const records = parsed.map((r): StoredSigil => {
      if (!r.id || !r.status) migrated = true;
      return {
        id: r.id ?? newId(),
        name: r.name ?? "Unnamed sigil",
        intention: r.intention ?? "",
        style: r.style ?? { color: "#e8e3d8", ring: false, glow: false },
        canvasJson: r.canvasJson ?? null,
        imageDataUrl: r.imageDataUrl ?? null,
        status: r.status === "DESTROYED" ? "DESTROYED" : "ACTIVE",
        isCharged: r.isCharged ?? false,
        chargedEmotion: r.chargedEmotion,
        finishedAt: r.finishedAt ?? new Date().toISOString(),
        chargedAt: r.chargedAt,
        destroyedAt: r.destroyedAt,
      };
    });
    if (migrated) writeAll(records);
    return records;
  } catch {
    return [];
  }
}

function writeAll(records: StoredSigil[]): void {
  localStorage.setItem(KEY, JSON.stringify(records));
}

export function listSigils(status?: StoredSigilStatus): StoredSigil[] {
  const all = readAll();
  return status ? all.filter((s) => s.status === status) : all;
}

/** Wipe all locally-kept sigils. Pre-account maintenance/testing only. */
export function clearAllSigils(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // nothing to clear
  }
}

export function getSigil(id: string): StoredSigil | null {
  return readAll().find((s) => s.id === id) ?? null;
}

export function keepSigil(
  input: Omit<StoredSigil, "id" | "status" | "finishedAt" | "destroyedAt">,
): StoredSigil {
  const record: StoredSigil = {
    ...input,
    id: newId(),
    status: "ACTIVE",
    finishedAt: new Date().toISOString(),
  };
  writeAll([...readAll(), record]);
  return record;
}

export function renameSigil(id: string, name: string): StoredSigil | null {
  const all = readAll();
  const target = all.find((s) => s.id === id);
  if (!target) return null;
  target.name = name.slice(0, 100) || "Unnamed sigil";
  writeAll(all);
  return target;
}

/** Charge completion: set emotion + isCharged. Re-charge overwrites (M5 decision). */
export function chargeSigil(id: string, emotion: EmotionKey): StoredSigil | null {
  const all = readAll();
  const target = all.find((s) => s.id === id);
  if (!target || target.status === "DESTROYED") return target ?? null;
  target.isCharged = true;
  target.chargedEmotion = emotion;
  target.chargedAt = new Date().toISOString();
  writeAll(all);
  return target;
}

/** The mechanical destroy: status flip + timestamp. The ritual wraps this. */
export function destroySigil(id: string): StoredSigil | null {
  const all = readAll();
  const target = all.find((s) => s.id === id);
  if (!target || target.status === "DESTROYED") return target ?? null;
  target.status = "DESTROYED";
  target.destroyedAt = new Date().toISOString();
  writeAll(all);
  return target;
}
