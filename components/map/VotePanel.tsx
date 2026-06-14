"use client";

/**
 * VotePanel — community ✨charge / 🔥destroy voting control.
 * STATUS: implemented (DB-backed via lib/sigil/actions.voteSigil)
 *
 * Optimistic toggle: same vote retracts, opposite switches; reconciles from
 * the server's recomputed scores. Shown on the sigil page now; the map reuses
 * it on marker popups (M4). NOTE: with the dev-identity shim there's one user,
 * so this is effectively self-voting until real accounts exist — kept per v1
 * parity; whether to disallow self-votes is an open question for the auth era.
 *
 * @see docs/features/map.md, docs/API_CONTRACT.md
 */
import { useState, useTransition } from "react";
import { voteSigil } from "@/lib/sigil/actions";
import type { VoteType } from "@/lib/sigil/types";

export function VotePanel({
  sigilId,
  initialChargeScore,
  initialDestroyScore,
  initialViewerVote,
}: {
  sigilId: string;
  initialChargeScore: number;
  initialDestroyScore: number;
  initialViewerVote: VoteType | null;
}) {
  const [charge, setCharge] = useState(initialChargeScore);
  const [destroy, setDestroy] = useState(initialDestroyScore);
  const [vote, setVote] = useState<VoteType | null>(initialViewerVote);
  const [pending, startTransition] = useTransition();

  const cast = (type: VoteType) => {
    startTransition(async () => {
      const next = await voteSigil(sigilId, type);
      setCharge(next.chargeScore);
      setDestroy(next.destroyScore);
      setVote(next.viewerVote);
    });
  };

  const btn = (type: VoteType, glyph: string, score: number, label: string) => {
    const active = vote === type;
    return (
      <button
        type="button"
        onClick={() => cast(type)}
        disabled={pending}
        aria-pressed={active}
        aria-label={`${label} (${score})`}
        className={
          "flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition disabled:opacity-60 " +
          (active
            ? type === "CHARGE"
              ? "border-violet-500 bg-violet-950/60 text-violet-200"
              : "border-red-700 bg-red-950/50 text-red-300"
            : "border-zinc-700 text-zinc-300 hover:border-zinc-500")
        }
      >
        <span aria-hidden>{glyph}</span>
        <span className="tabular-nums">{score}</span>
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Community energy</p>
      <div className="flex items-center gap-3">
        {btn("CHARGE", "✨", charge, "Vote to charge")}
        {btn("DESTROY", "🔥", destroy, "Vote to destroy")}
      </div>
    </div>
  );
}
