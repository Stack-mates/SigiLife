import { beforeEach, describe, expect, it } from "vitest";
import {
  destroySigil,
  getSigil,
  keepSigil,
  listSigils,
  renameSigil,
} from "./localStore";

// Minimal localStorage shim for the node test environment.
function installStorage() {
  const map = new Map<string, string>();
  globalThis.localStorage = {
    getItem: (k: string) => map.get(k) ?? null,
    setItem: (k: string, v: string) => void map.set(k, v),
    removeItem: (k: string) => void map.delete(k),
    clear: () => map.clear(),
    key: (i: number) => [...map.keys()][i] ?? null,
    get length() {
      return map.size;
    },
  } as Storage;
}

const DRAFT = {
  name: "Steady Hands",
  intention: "I move with steady hands",
  style: { color: "#fff", ring: true, glow: false },
  canvasJson: { objects: [] },
  imageDataUrl: "data:image/png;base64,x",
};

describe("localStore", () => {
  beforeEach(installStorage);

  it("keeps and lists sigils as ACTIVE", () => {
    const kept = keepSigil(DRAFT);
    expect(kept.id).toBeTruthy();
    expect(kept.status).toBe("ACTIVE");
    expect(listSigils("ACTIVE")).toHaveLength(1);
    expect(listSigils("DESTROYED")).toHaveLength(0);
  });

  it("destroy is a status flip, not a delete", () => {
    const kept = keepSigil(DRAFT);
    const destroyed = destroySigil(kept.id);
    expect(destroyed?.status).toBe("DESTROYED");
    expect(destroyed?.destroyedAt).toBeTruthy();
    expect(listSigils("ACTIVE")).toHaveLength(0);
    expect(listSigils("DESTROYED")).toHaveLength(1);
    expect(getSigil(kept.id)?.name).toBe("Steady Hands");
  });

  it("destroying twice is idempotent", () => {
    const kept = keepSigil(DRAFT);
    const first = destroySigil(kept.id)!;
    const second = destroySigil(kept.id)!;
    expect(second.destroyedAt).toBe(first.destroyedAt);
  });

  it("renames with the 100-char cap and empty-name fallback", () => {
    const kept = keepSigil(DRAFT);
    renameSigil(kept.id, "x".repeat(150));
    expect(getSigil(kept.id)?.name).toHaveLength(100);
    renameSigil(kept.id, "");
    expect(getSigil(kept.id)?.name).toBe("Unnamed sigil");
  });

  it("migrates v0 records (no id/status) on read", () => {
    localStorage.setItem(
      "sigilife:finished-sigils",
      JSON.stringify([{ name: "Old one", intention: "legacy", finishedAt: "2026-06-12T00:00:00Z" }]),
    );
    const all = listSigils();
    expect(all).toHaveLength(1);
    expect(all[0].id).toBeTruthy();
    expect(all[0].status).toBe("ACTIVE");
    // migration persisted: raw storage now carries the id
    expect(localStorage.getItem("sigilife:finished-sigils")).toContain(all[0].id);
  });

  it("returns null for unknown ids", () => {
    expect(getSigil("nope")).toBeNull();
    expect(renameSigil("nope", "x")).toBeNull();
    expect(destroySigil("nope")).toBeNull();
  });
});
