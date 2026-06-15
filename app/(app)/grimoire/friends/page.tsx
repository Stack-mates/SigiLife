/**
 * Friends — search, follow, and gather your SigiFriends.
 * STATUS: implemented
 * Route: /grimoire/friends
 *
 * Server component: resolves the viewer via the auth shim and hands the id to
 * the client leaves. Renders the Grimoire shell-wrapped sections:
 * - <UserSearch>: username search → results with <FollowButton>.
 * - <FriendsList>: SigiFriends (mutual) / Following / Followers tabs.
 * The shared-sigil scrying feed (SigilShare) is M4 — not wired here yet.
 *
 * The Grimoire tab bar is provided by the grimoire layout (GrimoireBook) — do
 * not duplicate it here.
 *
 * v1 reference: git show main:src/components/.../Profile/UserFriends.tsx
 * @see docs/features/social.md
 */
import { getCurrentUserId } from "@/lib/auth";
import { UserSearch } from "@/components/social/UserSearch";
import { FriendsList } from "@/components/social/FriendsList";

export default async function FriendsPage() {
  const viewerId = await getCurrentUserId();

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-1 text-center">
        <h1 className="font-serif text-2xl text-zinc-50">Your circle</h1>
        <p className="text-sm text-zinc-500">
          Scry for seekers, bind those whose work you trust, and gather the
          ones who bind you back — your SigiFriends, the only souls you can
          share a sigil with.
        </p>
      </header>

      <section aria-label="Find seekers">
        <UserSearch />
      </section>

      <section aria-label="Your bonds">
        <FriendsList userId={viewerId} />
      </section>
    </div>
  );
}
