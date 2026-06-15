/**
 * LeftPage — the default left grimoire page: profile summary.
 * STATUS: implemented · server component
 *
 * Props: { user: ProfileData } — avatar, username, sigilCount / destroyCount,
 * home location, SigiFriends preview. Condensed version of /grimoire/profile
 * for the default spread. Presentational only: the page/spread that mounts it
 * owns fetching the ProfileData.
 *
 * v1 reference: git show main:src/components/.../Grimoire/LeftPage/LeftPage.tsx
 * @see docs/features/grimoire.md
 */
import type { ProfileData } from "@/types";
import { Card } from "@/components/ui/Card";

/** Map the stored avatar index to its public asset (two in the set today). */
function avatarSrc(avatar: number): string {
  const n = avatar >= 1 && avatar <= 2 ? avatar : 1;
  return `/Avatar${n}.png`;
}

export function LeftPage({ user }: { user: ProfileData }) {
  const name = user.username ?? "Agent";

  const stats: { label: string; value: number }[] = [
    { label: "Sigils", value: user.sigilCount },
    { label: "Cases closed", value: user.destroyCount },
  ];

  return (
    <Card className="flex flex-col gap-6 p-6">
      <header className="flex flex-col items-center gap-2 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element -- static public avatar asset */}
        <img
          src={avatarSrc(user.avatar)}
          alt=""
          width={72}
          height={72}
          className="rounded-full border border-zinc-700"
        />
        <h2 className="font-serif text-2xl text-zinc-50">{name}</h2>
        {user.homeLocation ? (
          <p className="text-xs text-zinc-500">{user.homeLocation.name}</p>
        ) : (
          <p className="text-xs text-zinc-600">No home location yet</p>
        )}
      </header>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 text-center"
          >
            <div className="font-serif text-3xl text-violet-300 tabular-nums">
              {s.value}
            </div>
            <div className="mt-1 text-xs text-zinc-400">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
        <div className="text-xs uppercase tracking-wide text-zinc-500">
          SigiFriends
        </div>
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-zinc-300">
            <span className="font-serif text-lg text-zinc-100 tabular-nums">
              {user.followerCount}
            </span>{" "}
            followers
          </span>
          <span className="text-zinc-300">
            <span className="font-serif text-lg text-zinc-100 tabular-nums">
              {user.followingCount}
            </span>{" "}
            following
          </span>
        </div>
      </div>
    </Card>
  );
}
