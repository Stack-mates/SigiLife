"use client";

/**
 * Library — the user's sigil collection.
 * STATUS: implemented (local store; DB swap changes the data source only)
 * Route: /grimoire/library · ?view=completed shows Closed cases (DESTROYED)
 *
 * Pick-mode (?pick=charge|destroy) arrives with the rituals + home hub.
 *
 * @see docs/features/grimoire.md
 */
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SigilThumb } from "@/components/sigil/SigilThumb";
import { listSigils, type StoredSigil } from "@/lib/sigil/localStore";

function LibraryContent() {
  const completed = useSearchParams().get("view") === "completed";
  const [sigils, setSigils] = useState<StoredSigil[] | null>(null);

  useEffect(() => {
    setSigils(listSigils(completed ? "DESTROYED" : "ACTIVE"));
  }, [completed]);

  if (sigils === null) return <div className="py-16 text-center text-zinc-600">Opening the book…</div>;

  if (sigils.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        {completed ? (
          <p className="text-zinc-500">
            No closed cases yet. A destroyed sigil is a finished one —<br />
            this page will hold your record of completed work.
          </p>
        ) : (
          <>
            <p className="text-zinc-500">Your library is empty. Every agent starts somewhere.</p>
            <Link href="/make-sigil/write"
              className="rounded-full bg-violet-600 px-6 py-2.5 font-medium text-white transition hover:bg-violet-500">
              Craft your first sigil
            </Link>
          </>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 flex items-baseline justify-between">
        <h1 className="font-serif text-2xl text-zinc-50">{completed ? "Closed cases" : "Library"}</h1>
        <span className="text-sm tabular-nums text-zinc-500">{sigils.length}</span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {sigils.map((s) => (
          <SigilThumb key={s.id} sigil={s} />
        ))}
      </div>
    </>
  );
}

export default function LibraryPage() {
  return (
    <Suspense>
      <LibraryContent />
    </Suspense>
  );
}
