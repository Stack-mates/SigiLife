/**
 * Grimoire default — redirect to the library (the default spread with
 * profile arrives in the DB era when profile data exists).
 * STATUS: implemented (interim redirect)
 *
 * @see docs/features/grimoire.md
 */
import { redirect } from "next/navigation";

export default function GrimoirePage() {
  redirect("/grimoire/library");
}
