/**
 * Style step — name, ring, glow, local save.
 * STATUS: implemented (local-only save until auth/DB — ADR-009)
 * Route: /make-sigil/style
 *
 * Mounts <StyleSigil>. Real POST /api/sigils persistence, profanity check,
 * slot enforcement, and share-with-friends arrive with the auth milestone.
 *
 * @see docs/features/make-sigil.md
 */
import { StyleSigil } from "@/components/sigil/StyleSigil";

export default function StyleStepPage() {
  return (
    <main>
      <StyleSigil />
    </main>
  );
}
