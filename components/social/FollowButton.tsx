"use client";

/**
 * FollowButton — follow/unfollow toggle for one user.
 * STATUS: implemented · "use client" (M3)
 *
 * Props: { targetId: string; initialFollowing: boolean }
 * POST/DELETE /api/users/[targetId]/follows, optimistic flip with reconcile.
 * Idempotent server-side (unique constraint) so double-taps are safe.
 *
 * @see docs/features/social.md
 */
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";

interface FollowButtonProps {
  targetId: string;
  initialFollowing: boolean;
}

export function FollowButton({ targetId, initialFollowing }: FollowButtonProps) {
  const [following, setFollowing] = useState(initialFollowing);
  const [pending, startTransition] = useTransition();

  const toggle = () => {
    // Optimistic flip — server is idempotent, so a rapid double-tap is safe.
    const next = !following;
    setFollowing(next);

    startTransition(async () => {
      try {
        const res = await fetch(`/api/users/${targetId}/follows`, {
          method: next ? "POST" : "DELETE",
        });
        if (!res.ok) throw new Error(`follow toggle failed (${res.status})`);
        const json = (await res.json()) as { data?: { following?: boolean } };
        // Reconcile to the server's truth if it disagrees.
        if (typeof json.data?.following === "boolean") {
          setFollowing(json.data.following);
        }
      } catch (e) {
        console.error("FollowButton toggle error:", e);
        // Roll back the optimistic flip on failure.
        setFollowing(!next);
      }
    });
  };

  return (
    <Button
      variant={following ? "glass" : "primary"}
      size="sm"
      onClick={toggle}
      disabled={pending}
      aria-pressed={following}
      aria-label={following ? "Unbind this seeker" : "Bind this seeker"}
    >
      {following ? "Bound" : "Bind"}
    </Button>
  );
}
