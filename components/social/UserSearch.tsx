"use client";

/**
 * UserSearch — find users by username.
 * STATUS: implemented · "use client" (M3)
 *
 * Debounced input (300ms) → GET /api/users?q= (min 2 chars) → result rows
 * (avatar, username, <FollowButton>). Empty/no-results states in-fiction
 * ("the mirror shows no one by that name").
 *
 * v1 reference: search section of main:src/components/.../Profile/UserFriends.tsx
 * @see docs/features/social.md
 */
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/Card";
import { FollowButton } from "@/components/social/FollowButton";
import type { UserSummary } from "@/types";

const MIN_CHARS = 2;
const DEBOUNCE_MS = 300;

/** Avatar index → public asset, with a graceful fallback. */
function avatarSrc(avatar: number): string {
  return `/Avatar${avatar + 1}.png`;
}

const FALLBACK_AVATAR = "/Avatar1.png";

function UserRow({ user }: { user: UserSummary }) {
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

export function UserSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserSummary[] | null>(null);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const trimmed = query.trim();

  useEffect(() => {
    if (trimmed.length < MIN_CHARS) {
      setResults(null);
      setLoading(false);
      abortRef.current?.abort();
      return;
    }

    setLoading(true);
    const handle = setTimeout(async () => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch(
          `/api/users?q=${encodeURIComponent(trimmed)}`,
          { signal: controller.signal },
        );
        const json = (await res.json()) as { data?: UserSummary[] };
        setResults(json.data ?? []);
      } catch (e) {
        if ((e as Error).name !== "AbortError") {
          console.error("UserSearch error:", e);
          setResults([]);
        }
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(handle);
  }, [trimmed]);

  return (
    <div className="flex flex-col gap-3">
      <label className="sr-only" htmlFor="user-search">
        Search seekers by name
      </label>
      <input
        id="user-search"
        type="search"
        autoComplete="off"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Scry a name in the mirror…"
        className="w-full rounded-full border border-zinc-700 bg-zinc-900/60 px-5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 backdrop-blur transition focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
      />

      {trimmed.length > 0 && trimmed.length < MIN_CHARS && (
        <p className="px-1 text-xs text-zinc-500">
          Give the mirror at least two letters to look on.
        </p>
      )}

      {loading && (
        <p className="px-1 text-xs text-zinc-500">Peering into the glass…</p>
      )}

      {!loading && results !== null && results.length === 0 && (
        <p className="px-1 text-sm text-zinc-500">
          The mirror shows no one by that name.
        </p>
      )}

      {results !== null && results.length > 0 && (
        <Card>
          <ul className="divide-y divide-zinc-800">
            {results.map((u) => (
              <UserRow key={u.id} user={u} />
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
