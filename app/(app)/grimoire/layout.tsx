/**
 * Grimoire layout — mounts the book shell around all grimoire pages.
 * STATUS: implemented
 *
 * @see docs/features/grimoire.md
 */
import { GrimoireBook } from "@/components/grimoire/GrimoireBook";

export default function GrimoireLayout({ children }: { children: React.ReactNode }) {
  return <GrimoireBook>{children}</GrimoireBook>;
}
