/**
 * Write step — the intention.
 * STATUS: implemented
 * Route: /make-sigil/write
 *
 * Mounts <WriteSigil>: textarea + live character chips (extraction rules in
 * lib/sigil/extractSigilCharacters) + Next gating. Server-side profanity
 * filtering happens at save (auth/DB milestone — ADR-009).
 *
 * @see docs/features/make-sigil.md
 */
import { WriteSigil } from "@/components/sigil/WriteSigil";

export default function WriteStepPage() {
  return (
    <main>
      <WriteSigil />
    </main>
  );
}
