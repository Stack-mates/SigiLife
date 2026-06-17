/**
 * SharedWithMe — the scrying mirror: sigils SigiFriends have shared with you.
 * STATUS: implemented · server component
 *
 * Props: { shared: SharedSigil[] } — the read side of SigilShare, newest
 * first. Presentational only; the page that mounts it owns fetching
 * (lib/user/actions listSharedWithMe).
 *
 * @see docs/features/social.md
 */
import Link from "next/link";
import type { SharedSigil } from "@/types";
import { Card } from "@/components/ui/Card";

export function SharedWithMe({ shared }: { shared: SharedSigil[] }) {
  return (
    <Card className="flex flex-col gap-4 p-6">
      <header className="flex flex-col gap-1">
        <h2 className="font-serif text-xl text-zinc-50">The scrying mirror</h2>
        <p className="text-sm text-zinc-500">
          Sigils your SigiFriends have shared with you.
        </p>
      </header>

      {shared.length === 0 ? (
        <p className="py-8 text-center text-sm text-zinc-600">
          The mirror is still. No one has shared a sigil with you yet.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {shared.map((sigil) => (
            <li key={sigil.id}>
              <Link
                href={`/grimoire/sigil/${sigil.id}`}
                className="group flex flex-col gap-2 rounded-xl border border-zinc-800 bg-zinc-900 p-2 transition hover:border-violet-700"
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
                <div className="flex flex-col">
                  <p className="truncate text-xs text-zinc-300 group-hover:text-white">
                    {sigil.name}
                  </p>
                  <p className="truncate text-[0.7rem] text-zinc-600">
                    from {sigil.ownerUsername ?? "a seeker"}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
