/**
 * RightPage — the default right grimoire page: library preview.
 * STATUS: implemented · server component
 *
 * Props: { sigils: SigilSummary[] } — recent sigils as a small thumb grid
 * (rendered from imageDataUrl) with an "Open library →" link to
 * /grimoire/library. Presentational only: the spread that mounts it owns
 * fetching the list (and any "recent" slicing).
 *
 * v1 reference: git show main:src/components/.../Grimoire/RightPage/RightPage.tsx
 * @see docs/features/grimoire.md
 */
import Link from "next/link";
import type { SigilSummary } from "@/types";
import { Card } from "@/components/ui/Card";

export function RightPage({ sigils }: { sigils: SigilSummary[] }) {
  return (
    <Card className="flex flex-col gap-4 p-6">
      <header className="flex items-baseline justify-between">
        <h2 className="font-serif text-xl text-zinc-50">Recent sigils</h2>
        <Link
          href="/grimoire/library"
          className="text-sm text-violet-300 transition hover:text-violet-200"
        >
          Open library &rarr;
        </Link>
      </header>

      {sigils.length === 0 ? (
        <p className="py-8 text-center text-sm text-zinc-600">
          No sigils yet. Craft your first to fill these pages.
        </p>
      ) : (
        <ul className="grid grid-cols-3 gap-3">
          {sigils.map((sigil) => {
            const closed = sigil.status === "DESTROYED";
            return (
              <li key={sigil.id}>
                <Link
                  href={`/grimoire/sigil/${sigil.id}`}
                  className={
                    "group flex flex-col gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 p-2 transition hover:border-violet-700 " +
                    (closed ? "opacity-50 saturate-50" : "")
                  }
                >
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-zinc-950">
                    {sigil.imageDataUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element -- data URLs
                      <img
                        src={sigil.imageDataUrl}
                        alt=""
                        className="size-full object-contain"
                      />
                    ) : (
                      <div className="grid size-full place-items-center text-zinc-700">
                        ?
                      </div>
                    )}
                  </div>
                  <p className="truncate text-xs text-zinc-300 group-hover:text-white">
                    {sigil.name}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
