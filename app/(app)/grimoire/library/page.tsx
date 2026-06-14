"use client";

/**
 * Library — the user's sigil collection.
 * STATUS: implemented (local store; DB swap changes the data source only)
 * Route: /grimoire/library
 *   ?view=completed       → Closed cases (DESTROYED)
 *   ?pick=charge|destroy  → chooser mode: thumbs route to the ritual page
 *                           (entered from the home hub's Charge/Destroy)
 *
 * @see docs/features/grimoire.md, docs/features/charge-destroy.md
 */
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SigilThumb } from "@/components/sigil/SigilThumb";
import { listSigils } from "@/lib/sigil/actions";
import type { SigilView } from "@/lib/sigil/types";

function LibraryContent() {
  const params = useSearchParams();
  const completed = params.get("view") === "completed";
  const pick = params.get("pick"); // "charge" | "destroy" | null
  const [sigils, setSigils] = useState<SigilView[] | null>(null);

  useEffect(() => {
    listSigils(completed ? "DESTROYED" : "ACTIVE").then(setSigils);
  }, [completed]);

  const thumbHref = (s: SigilView) =>
    pick === "charge" ? `/charge-sigil/${s.id}`
      : pick === "destroy" ? `/destroy-sigil/${s.id}`
        : undefined;

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
            <p className="text-zinc-500">
              {pick ? `Nothing to ${pick} — your library is empty.` : "Your library is empty. Every agent starts somewhere."}
            </p>
            <Link href="/make-sigil/write"
              className="rounded-full bg-violet-600 px-6 py-2.5 font-medium text-white transition hover:bg-violet-500">
              Craft your first sigil
            </Link>
          </>
        )}
      </div>
    );
  }

  const title = pick === "charge" ? "Choose a sigil to charge"
    : pick === "destroy" ? "Choose a sigil to destroy"
      : completed ? "Closed cases" : "Library";

  return (
    <>
      <div className="mb-4 flex items-baseline justify-between">
        <h1 className="font-serif text-2xl text-zinc-50">{title}</h1>
        <span className="text-sm tabular-nums text-zinc-500">{sigils.length}</span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {sigils.map((s) => (
          <SigilThumb key={s.id} sigil={s} href={thumbHref(s)} />
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
