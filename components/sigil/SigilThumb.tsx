"use client";

/**
 * SigilThumb — library grid thumbnail.
 * STATUS: implemented (client — reads come from the local store for now)
 *
 * Shows the sigil render with its style treatment (ring/glow preview),
 * name, and a muted "closed" treatment for DESTROYED records.
 *
 * @see docs/features/grimoire.md
 */
import Link from "next/link";
import type { SigilView } from "@/lib/sigil/types";

export function SigilThumb({ sigil, href }: { sigil: SigilView; href?: string }) {
  const closed = sigil.status === "DESTROYED";
  return (
    <Link
      href={href ?? `/grimoire/sigil/${sigil.id}`}
      className={
        "group flex flex-col gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 p-3 transition hover:border-violet-700 " +
        (closed ? "opacity-50 saturate-50" : "")
      }
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-950">
        {sigil.style.ring && (
          <div className="pointer-events-none absolute inset-1 rounded-full border opacity-60"
            style={{ borderColor: sigil.style.color }} aria-hidden />
        )}
        {sigil.imageDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- data URLs
          <img src={sigil.imageDataUrl} alt="" className="size-full object-contain"
            style={sigil.style.glow ? { filter: `drop-shadow(0 0 10px ${sigil.style.color})` } : undefined} />
        ) : (
          <div className="grid size-full place-items-center text-zinc-700">?</div>
        )}
      </div>
      <p className="truncate text-sm text-zinc-200 group-hover:text-white">{sigil.name}</p>
      <p className="text-xs text-zinc-600">
        {closed ? `closed ${sigil.destroyedAt?.slice(0, 10) ?? ""}` : sigil.finishedAt.slice(0, 10)}
      </p>
    </Link>
  );
}
