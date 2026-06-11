/**
 * Make Sigil entry — redirects to the first wizard step.
 * STATUS: stub
 * Route: /make-sigil → redirect /make-sigil/write
 *
 * What goes here (M2): redirect("/make-sigil/write"). The v1 slot-limit
 * gate that lived here moved server-side into POST /api/sigils
 * (docs/API_CONTRACT.md) — the wizard shows <SlotMeter> instead.
 *
 * @see docs/features/make-sigil.md
 */
import { redirect } from "next/navigation";

export default function MakeSigilPage() {
  redirect("/make-sigil/write");
}
