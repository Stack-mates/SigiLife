"use client";

/**
 * Sigil page — full detail view: render, intention, rename, charge, destroy.
 * STATUS: implemented (local store era — votes/SigiLites/location arrive
 * with the DB). Charge/Destroy route to their ritual pages (M5); charged
 * state + emotion are shown here.
 * Route: /grimoire/sigil/[sigilId]
 *
 * @see docs/features/grimoire.md, docs/features/charge-destroy.md
 */
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { SigilRenderer } from "@/components/sigil/SigilRenderer";
import { getSigil, renameSigil } from "@/lib/sigil/actions";
import type { SigilView } from "@/lib/sigil/types";
import { EMOTIONS } from "@/types";

export default function SigilPage({ params }: { params: Promise<{ sigilId: string }> }) {
  const { sigilId } = use(params);
  const [sigil, setSigil] = useState<SigilView | null | undefined>(undefined);

  useEffect(() => {
    getSigil(sigilId).then(setSigil);
  }, [sigilId]);

  if (sigil === undefined) return <div className="py-16 text-center text-zinc-600">Consulting the book…</div>;

  if (sigil === null) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-zinc-500">The book has no page for this sigil.</p>
        <Link href="/grimoire/library" className="text-violet-400 hover:text-violet-300">
          ← Back to the library
        </Link>
      </div>
    );
  }

  const closed = sigil.status === "DESTROYED";

  const handleRename = async (name: string) => {
    const updated = await renameSigil(sigil.id, name);
    if (updated) setSigil({ ...updated });
  };

  const charged = sigil.isCharged && sigil.chargedEmotion;

  return (
    <div className="flex flex-col gap-6">
      <Link href={closed ? "/grimoire/library?view=completed" : "/grimoire/library"}
        className="text-sm text-zinc-500 hover:text-zinc-300">
        ← {closed ? "Closed cases" : "Library"}
      </Link>

      {closed && (
        <p className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-center text-sm text-zinc-400">
          Case closed {sigil.destroyedAt?.slice(0, 10)} — this work is finished.
        </p>
      )}

      <SigilRenderer sigil={sigil} />

      <div className="flex flex-col gap-3">
        <input
          type="text"
          defaultValue={sigil.name}
          onBlur={(e) => e.target.value !== sigil.name && handleRename(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
          disabled={closed}
          aria-label="Sigil name"
          className="rounded-xl border border-transparent bg-transparent px-2 py-1 text-center font-serif text-2xl text-zinc-50 transition focus:border-zinc-700 focus:bg-zinc-900 focus:outline-none disabled:opacity-70"
        />
        {sigil.intention && (
          <blockquote className="text-center text-sm italic text-zinc-400">
            &ldquo;{sigil.intention}&rdquo;
          </blockquote>
        )}
        {charged && (
          <p className="flex items-center justify-center gap-2 text-center text-sm text-zinc-300">
            <span className="size-2.5 rounded-full"
              style={{ backgroundColor: EMOTIONS[sigil.chargedEmotion!].color, boxShadow: `0 0 8px ${EMOTIONS[sigil.chargedEmotion!].color}` }}
              aria-hidden />
            ⚡ Charged with {EMOTIONS[sigil.chargedEmotion!].label.toLowerCase()}
          </p>
        )}
        <p className="text-center text-xs text-zinc-600">kept {sigil.finishedAt.slice(0, 10)}</p>
      </div>

      {!closed && (
        <div className="flex items-center justify-center gap-3 border-t border-zinc-800 pt-6">
          <Link href={`/charge-sigil/${sigil.id}`}
            className="rounded-full bg-violet-600 px-6 py-2.5 font-medium text-white transition hover:bg-violet-500">
            ✨ {charged ? "Re-charge" : "Charge"}
          </Link>
          <Link href={`/destroy-sigil/${sigil.id}`}
            className="rounded-full border border-red-900/60 px-6 py-2.5 text-red-400/90 transition hover:border-red-700 hover:text-red-300">
            🔥 Destroy
          </Link>
        </div>
      )}
    </div>
  );
}
