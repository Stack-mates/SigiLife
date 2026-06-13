"use client";

/**
 * Destroy ritual page.
 * STATUS: implemented (local-first; ADR-009)
 * Route: /destroy-sigil/[sigilId] · client-heavy (OGL WebGL)
 *
 * Loads the sigil from the local store and mounts <DestroyRitual>. Unknown id
 * or already-destroyed → graceful message. Auth ownership arrives with the DB.
 *
 * @see docs/features/charge-destroy.md
 */
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { DestroyRitual } from "@/components/destroy/DestroyRitual";
import { getSigil, type StoredSigil } from "@/lib/sigil/localStore";

export default function DestroySigilPage({ params }: { params: Promise<{ sigilId: string }> }) {
  const { sigilId } = use(params);
  const [sigil, setSigil] = useState<StoredSigil | null | undefined>(undefined);

  useEffect(() => {
    setSigil(getSigil(sigilId));
  }, [sigilId]);

  if (sigil === undefined) {
    return <main className="grid min-h-dvh place-items-center bg-black text-zinc-600">Lighting the eye…</main>;
  }
  if (sigil === null || sigil.status === "DESTROYED") {
    return (
      <main className="grid min-h-dvh place-items-center bg-black px-6 text-center text-zinc-400">
        <div className="flex flex-col items-center gap-4">
          <p>{sigil === null ? "No such sigil." : "This case is already closed."}</p>
          <Link href="/grimoire/library?view=completed" className="text-violet-400 hover:text-violet-300">
            → Closed cases
          </Link>
        </div>
      </main>
    );
  }
  return <DestroyRitual sigil={sigil} />;
}
