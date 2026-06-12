/**
 * Draw step — the sigil canvas.
 * STATUS: implemented
 * Route: /make-sigil/draw · client-heavy page (Fabric.js editor)
 *
 * Mounts <DrawSigilCanvas>: single-canvas editor (select + pen tools),
 * letterforms traced as vector paths from /api/vectors. The component
 * itself guards the step (no characters in draft → back to /write).
 *
 * @see docs/features/make-sigil.md
 */
import { DrawSigilCanvas } from "@/components/sigil/DrawSigilCanvas";

export default function DrawStepPage() {
  return (
    <main>
      <DrawSigilCanvas />
    </main>
  );
}
