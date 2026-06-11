/**
 * FollowButton — follow/unfollow toggle for one user.
 * STATUS: stub · "use client" (M3)
 *
 * Props (planned): { targetId: string; initialFollowing: boolean }
 * POST/DELETE /api/users/[targetId]/follows, optimistic flip with reconcile.
 * Idempotent server-side (unique constraint) so double-taps are safe.
 *
 * @see docs/features/social.md
 */
export function FollowButton() {
  return <button type="button">Follow (stub)</button>;
}
