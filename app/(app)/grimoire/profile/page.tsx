/**
 * Profile — the agent's standing, DB-backed.
 * STATUS: implemented (server component over lib/user/actions getMyProfile)
 * Route: /grimoire/profile
 *
 * Identity (username, avatar, home) + SigiFriends counts come from the User /
 * Follow rows; the ritual breakdown (crafted / active / charged / closed) is
 * counted live from Sigil rows. Replaces the earlier local-first client page.
 *
 * v1 reference: git show main:src/components/.../Profile/UserProfile.tsx
 * @see docs/features/grimoire.md, docs/features/social.md
 */
import Link from "next/link";
import { getMyProfile } from "@/lib/user/actions";

/** 0-indexed avatar → public asset (two in the set today). */
function avatarSrc(avatar: number): string {
  return `/Avatar${(((avatar % 2) + 2) % 2) + 1}.png`;
}

export default async function ProfilePage() {
  const p = await getMyProfile();
  const name = p.username ?? "Agent";

  const cards: { label: string; value: number; hint: string }[] = [
    { label: "Sigils crafted", value: p.sigilCount, hint: "all time" },
    { label: "Active", value: p.activeCount, hint: "in your library" },
    { label: "Charged", value: p.chargedCount, hint: "carrying intent" },
    { label: "Cases closed", value: p.destroyCount, hint: "work completed" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col items-center gap-2 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element -- static public avatar asset */}
        <img
          src={avatarSrc(p.avatar)}
          alt=""
          width={72}
          height={72}
          className="rounded-full border border-zinc-700"
        />
        <h1 className="font-serif text-2xl text-zinc-50">{name}</h1>
        {p.homeLocation ? (
          <p className="text-xs text-zinc-500">{p.homeLocation.name}</p>
        ) : (
          <p className="text-xs text-zinc-600">No home location yet</p>
        )}
      </header>

      <Link
        href="/grimoire/friends"
        className="mx-auto flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 px-5 py-3 text-sm transition hover:border-zinc-600"
      >
        <span className="text-zinc-300">
          <span className="font-serif text-lg text-zinc-100 tabular-nums">
            {p.followerCount}
          </span>{" "}
          followers
        </span>
        <span className="text-zinc-700">·</span>
        <span className="text-zinc-300">
          <span className="font-serif text-lg text-zinc-100 tabular-nums">
            {p.followingCount}
          </span>{" "}
          following
        </span>
      </Link>

      <div className="grid grid-cols-2 gap-3">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 text-center"
          >
            <div className="font-serif text-3xl text-violet-300 tabular-nums">
              {c.value}
            </div>
            <div className="mt-1 text-sm text-zinc-200">{c.label}</div>
            <div className="text-xs text-zinc-600">{c.hint}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
