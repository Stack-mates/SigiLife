/**
 * FriendsList — followers / following / SigiFriends tabs.
 * STATUS: stub · "use client" (M3)
 *
 * Props (planned): { userId: string } — fetches
 * GET /api/users/[id]/follows?direction=followers|following|mutual per tab.
 * Mutual tab is "SigiFriends" (the shareable set). Rows: avatar, username,
 * <FollowButton>, link to their profile view (post-launch — open question).
 *
 * v1 reference: git show main:src/components/.../Profile/UserFriends.tsx
 * @see docs/features/social.md
 */
export function FriendsList() {
  return <div>FriendsList (stub)</div>;
}
