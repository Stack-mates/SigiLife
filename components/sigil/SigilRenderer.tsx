"use client";

/**
 * SigilRenderer — the single way a saved sigil is displayed at size.
 * STATUS: implemented (CSS ring/glow treatment; baked rendering arrives
 * with the server save pipeline)
 *
 * @see docs/features/grimoire.md
 */
import type { SigilView } from "@/lib/sigil/types";

export function SigilRenderer({ sigil }: { sigil: SigilView }) {
  const closed = sigil.status === "DESTROYED";
  return (
    <div className={"relative mx-auto aspect-square w-full max-w-xs " + (closed ? "opacity-60 saturate-50" : "")}>
      {sigil.style.ring && (
        <div className="pointer-events-none absolute inset-2 rounded-full border-2 opacity-70"
          style={{ borderColor: sigil.style.color }} aria-hidden />
      )}
      {sigil.imageDataUrl ? (
        // eslint-disable-next-line @next/next/no-img-element -- data URLs
        <img src={sigil.imageDataUrl} alt={`Sigil: ${sigil.name}`}
          className="size-full rounded-2xl border border-zinc-800 bg-zinc-950 object-contain"
          style={sigil.style.glow ? { filter: `drop-shadow(0 0 18px ${sigil.style.color})` } : undefined} />
      ) : (
        <div className="grid size-full place-items-center rounded-2xl border border-zinc-800 bg-zinc-950 text-zinc-700">
          no render
        </div>
      )}
    </div>
  );
}
