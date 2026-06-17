/**
 * Grimoire default — the two-page spread: profile summary (left) + recent
 * sigils (right). Mounts the previously-orphaned LeftPage/RightPage.
 * STATUS: implemented · server component
 * Route: /grimoire
 *
 * Loads the viewer's profile (lib/user/actions getMyProfile) and recent sigils
 * (lib/sigil/actions listSigils) and composes the spread inside the grimoire
 * book shell (provided by the layout). Sub-pages (library, profile, friends,
 * map, settings) are reachable from the ribbon tabs.
 *
 * v1 reference: git show main:src/components/.../Grimoire/Grimoire.tsx
 * @see docs/features/grimoire.md
 */
import { getMyProfile } from "@/lib/user/actions";
import { listSigils } from "@/lib/sigil/actions";
import { LeftPage } from "@/components/grimoire/LeftPage";
import { RightPage } from "@/components/grimoire/RightPage";
import type { SigilSummary } from "@/types";

export default async function GrimoirePage() {
  const [profile, sigils] = await Promise.all([getMyProfile(), listSigils()]);

  const recent: SigilSummary[] = sigils.slice(0, 6).map((s) => ({
    id: s.id,
    name: s.name,
    imageDataUrl: s.imageDataUrl,
    status: s.status,
    isCharged: s.isCharged,
    finishedAt: s.finishedAt,
  }));

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <LeftPage user={profile} />
      <RightPage sigils={recent} />
    </div>
  );
}
