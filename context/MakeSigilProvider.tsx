"use client";

/**
 * MakeSigilProvider — the in-progress sigil draft across the wizard.
 * STATUS: implemented (local persistence only — server save lands with auth/DB, ADR-009)
 *
 * Holds the draft for write → draw → style; mirrors to sessionStorage so a
 * refresh mid-wizard doesn't lose work. `characters` is always derived from
 * `intention` via extractSigilCharacters — never set directly.
 *
 * @see docs/features/make-sigil.md
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { extractSigilCharacters } from "@/lib/sigil/extractSigilCharacters";

export type SigilStyle = {
  color: string;
  ring: boolean;
  glow: boolean;
};

export type SigilDraft = {
  intention: string;
  /** Fabric canvas JSON snapshot from the editor (null until first visit). */
  canvasJson: unknown | null;
  /** PNG data-URL render of the canvas (kept in sync with canvasJson). */
  imageDataUrl: string | null;
  style: SigilStyle;
  name: string;
};

const EMPTY_DRAFT: SigilDraft = {
  intention: "",
  canvasJson: null,
  imageDataUrl: null,
  style: { color: "#e8e3d8", ring: false, glow: false },
  name: "",
};

const STORAGE_KEY = "sigilife:make-sigil-draft";

type MakeSigilContextValue = {
  draft: SigilDraft;
  /** Derived: the glyph seeds for the editor. */
  characters: string[];
  setIntention: (intention: string) => void;
  setCanvas: (canvasJson: unknown, imageDataUrl: string | null) => void;
  setStyle: (style: Partial<SigilStyle>) => void;
  setName: (name: string) => void;
  reset: () => void;
  /** Step validity. */
  canDraw: boolean;
  canStyle: boolean;
};

const MakeSigilContext = createContext<MakeSigilContextValue | null>(null);

export function MakeSigilProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = useState<SigilDraft>(EMPTY_DRAFT);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) setDraft({ ...EMPTY_DRAFT, ...JSON.parse(stored) });
    } catch {
      // corrupted draft — start fresh
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // storage full/unavailable — draft just won't survive refresh
    }
  }, [draft, hydrated]);

  const setIntention = useCallback(
    (intention: string) => setDraft((d) => ({ ...d, intention })),
    [],
  );
  const setCanvas = useCallback(
    (canvasJson: unknown, imageDataUrl: string | null) =>
      setDraft((d) => ({ ...d, canvasJson, imageDataUrl })),
    [],
  );
  const setStyle = useCallback(
    (style: Partial<SigilStyle>) =>
      setDraft((d) => ({ ...d, style: { ...d.style, ...style } })),
    [],
  );
  const setName = useCallback((name: string) => setDraft((d) => ({ ...d, name })), []);
  const reset = useCallback(() => {
    setDraft(EMPTY_DRAFT);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // nothing to clean
    }
  }, []);

  const characters = useMemo(
    () => extractSigilCharacters(draft.intention),
    [draft.intention],
  );

  const value = useMemo<MakeSigilContextValue>(
    () => ({
      draft,
      characters,
      setIntention,
      setCanvas,
      setStyle,
      setName,
      reset,
      canDraw: characters.length > 0,
      canStyle: draft.canvasJson !== null,
    }),
    [draft, characters, setIntention, setCanvas, setStyle, setName, reset],
  );

  return <MakeSigilContext.Provider value={value}>{children}</MakeSigilContext.Provider>;
}

export function useMakeSigil(): MakeSigilContextValue {
  const ctx = useContext(MakeSigilContext);
  if (!ctx) throw new Error("useMakeSigil must be used inside MakeSigilProvider");
  return ctx;
}
