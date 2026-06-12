"use client";

/**
 * Sigil page — full detail view: render, intention, rename, destroy.
 * STATUS: implemented (local store era — votes/SigiLites/location arrive
 * with the DB; ritual VISUALS for destroy arrive in the rituals milestone,
 * this is the mechanical status flip with an in-fiction confirm)
 * Route: /grimoire/sigil/[sigilId]
 *
 * @see docs/features/grimoire.md, docs/plans/M3-grimoire.md
 */
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SigilRenderer } from "@/components/sigil/SigilRenderer";
import { destroySigil, getSigil, renameSigil, type StoredSigil } from "@/lib/sigil/localStore";

export default function SigilPage({ params }: { params: Promise<{ sigilId: string }> }) {
  const { sigilId } = use(params);
  const router = useRouter();
  const [sigil, setSigil] = useState<StoredSigil | null | undefined>(undefined);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    setSigil(getSigil(sigilId));
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

  const handleRename = (name: string) => {
    const updated = renameSigil(sigil.id, name);
    if (updated) setSigil({ ...updated });
  };

  const handleDestroy = () => {
    const updated = destroySigil(sigil.id);
    if (updated) {
      setSigil({ ...updated });
      setConfirming(false);
      router.push("/grimoire/library?view=completed");
    }
  };

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
        <p className="text-center text-xs text-zinc-600">kept {sigil.finishedAt.slice(0, 10)}</p>
      </div>

      {!closed && (
        <div className="flex flex-col items-center gap-3 border-t border-zinc-800 pt-6">
          {confirming ? (
            <>
              <p className="text-center text-sm text-zinc-300">
                Close this case? Destruction is completion — it cannot be undone.
              </p>
              <div className="flex gap-3">
                <button type="button" onClick={() => setConfirming(false)}
                  className="rounded-full border border-zinc-700 px-6 py-2 text-zinc-300 hover:border-zinc-500">
                  Not yet
                </button>
                <button type="button" onClick={handleDestroy}
                  className="rounded-full bg-red-700 px-6 py-2 font-medium text-white hover:bg-red-600">
                  Destroy it
                </button>
              </div>
            </>
          ) : (
            <button type="button" onClick={() => setConfirming(true)}
              className="rounded-full border border-red-900/60 px-6 py-2 text-red-400/90 transition hover:border-red-700 hover:text-red-300">
              🔥 Destroy this sigil
            </button>
          )}
        </div>
      )}
    </div>
  );
}
