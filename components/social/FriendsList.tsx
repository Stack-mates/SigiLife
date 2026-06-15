"use client";

/**
 * FriendsList — followers / following / SigiFriends tabs.
 * STATUS: implemented · "use client" (M3)
 *
 * Props: { userId: string } — fetches
 * GET /api/users/[id]/follows?direction=followers|following|mutual per tab.
 * Mutual tab is "SigiFriends" (the shareable set). Rows: avatar, username,
 * <FollowButton>. Sensible 0-state copy per tab.
 *
 * v1 reference: git show main:src/components/.../Profile/UserFriends.tsx
 * @see docs/features/social.md
 */
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { FollowButton } from "@/components/social/FollowButton";
import type { UserSummary } from "@/types";

interface FriendsListProps {
  userId: string;
}

type Direction = "mutual" | "following" | "followers";

const TABS: { key: Direction; label: string; empty: string }[] = [
  {
    key: "mutual",
    label: "SigiFriends",
    empty:
      "No bonds run both ways yet. Bind a seeker who binds you back to forge a SigiFriend.",
  },
  {
    key: "following",
    label: "Following",
    empty: "You follow no one yet. Scry a name above to begin.",
  },
  {
    key: "followers",
    label: "Followers",
    empty: "No one trails your work yet. They will come.",
  },
];

/** Avatar index → public asset, with a graceful fallback. */
function avatarSrc(avatar: number): string {
  return `/Avatar${avatar + 1}.png`;
}

const FALLBACK_AVATAR = "/Avatar1.png";

function FriendRow({ user }: { user: UserSummary }) {
  const [src, setSrc] = useState(avatarSrc(user.avatar));
  return (
    <li className="flex items-center gap-3 px-4 py-3">
      {/* eslint-disable-next-line @next/next/no-img-element -- static public avatar */}
      <img
        src={src}
        alt=""
        width={40}
        height={40}
        onError={() => setSrc(FALLBACK_AVATAR)}
        className="size-10 shrink-0 rounded-full border border-zinc-700 bg-zinc-800 object-cover"
      />
      <span className="min-w-0 flex-1 truncate text-sm text-zinc-100">
        {user.username ?? "a nameless seeker"}
      </span>
      <FollowButton
        targetId={user.id}
        initialFollowing={user.isFollowing ?? false}
      />
    </li>
  );
}

export function FriendsList({ userId }: FriendsListProps) {
  const [active, setActive] = useState<Direction>("mutual");
  const [users, setUsers] = useState<UserSummary[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    setUsers(null);
    (async () => {
      try {
        const res = await fetch(
          `/api/users/${userId}/follows?direction=${active}`,
        );
        const json = (await res.json()) as { data?: UserSummary[] };
        if (!cancelled) setUsers(json.data ?? []);
      } catch (e) {
        console.error("FriendsList error:", e);
        if (!cancelled) setUsers([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userId, active]);

  const activeTab = TABS.find((t) => t.key === active)!;

  return (
    <div className="flex flex-col gap-3">
      <div
        role="tablist"
        aria-label="Your circle"
        className="flex items-center gap-2"
      >
        {TABS.map((tab) => {
          const selected = tab.key === active;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(tab.key)}
              className={
                "rounded-full px-4 py-1.5 text-sm transition " +
                (selected
                  ? "bg-violet-600 text-white"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100")
              }
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {users === null ? (
        <p className="px-1 py-8 text-center text-sm text-zinc-600">
          Reading the threads…
        </p>
      ) : users.length === 0 ? (
        <p className="px-1 py-8 text-center text-sm text-zinc-500">
          {activeTab.empty}
        </p>
      ) : (
        <Card>
          <ul className="divide-y divide-zinc-800">
            {users.map((u) => (
              <FriendRow key={u.id} user={u} />
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
