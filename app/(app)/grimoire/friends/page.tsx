/**
 * Friends — search, follow, and scrye your SigiFriends.
 * STATUS: stub
 * Route: /grimoire/friends
 *
 * What goes here (M3 follows · M4 shared-sigil feed):
 * - <UserSearch> (components/social): username search → results with
 *   <FollowButton>.
 * - <FriendsList>: followers / following / SigiFriends (mutual) tabs.
 * - Scrying mirror section: sigils shared with me (SigilShare), newest first.
 * - Empty state: in-fiction invite copy (the mirror shows no one yet).
 *
 * v1 reference: git show main:src/components/.../Profile/UserFriends.tsx and
 *   main:src/components/.../ScryeFriends/ (abandoned concept — inspiration only)
 * @see docs/features/social.md
 */
export default function FriendsPage() {
  return <main className="p-8">friends (stub)</main>;
}
