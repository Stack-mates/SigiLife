"use client";

/**
 * Charge ritual page.
 * STATUS: implemented (local-first; ADR-009)
 * Route: /charge-sigil/[sigilId] · client-heavy (WebGL fluid sim)
 *
 * Loads the sigil from the local store and mounts <ChargeRitual>. Unknown id
 * or an already-destroyed sigil → graceful redirect/message. Auth ownership
 * checks arrive with the DB milestone.
 *
 * @see docs/features/charge-destroy.md
 */
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ChargeRitual } from "@/components/charge/ChargeRitual";
import { getSigil } from "@/lib/sigil/actions";
import type { SigilView } from "@/lib/sigil/types";

export default function ChargeSigilPage({ params }: { params: Promise<{ sigilId: string }> }) {
  const { sigilId } = use(params);
  const [sigil, setSigil] = useState<SigilView | null | undefined>(undefined);

  useEffect(() => {
    getSigil(sigilId).then(setSigil);
  }, [sigilId]);

  if (sigil === undefined) {
    return <main className="grid min-h-dvh place-items-center bg-black text-zinc-600">Preparing the altar…</main>;
  }
  if (sigil === null || sigil.status === "DESTROYED") {
    return (
      <main className="grid min-h-dvh place-items-center bg-black px-6 text-center text-zinc-400">
        <div className="flex flex-col items-center gap-4">
          <p>{sigil === null ? "No such sigil." : "A destroyed sigil cannot be charged."}</p>
          <Link href="/grimoire/library" className="text-violet-400 hover:text-violet-300">
            ← Back to the library
          </Link>
        </div>
      </main>
    );
  }
  return <ChargeRitual sigil={sigil} />;
}
