/**
 * PageShell — full-bleed Lino room background with a content slot.
 * STATUS: stub · server component
 *
 * Props (planned): { art: string (public/art path); children; overlayClassName? }
 * What goes here (M1): the v1 page pattern done once — background illustration
 * (next/image, priority), aspect-ratio handling for phone portrait (v1 scaled
 * a 2160x1260 desktop scene; rebuild crops/anchors art mobile-first),
 * glasscard content container. Used by home, landing, wizard, grimoire pages.
 *
 * v1 reference: the .maincontainer/.art-page-base pattern in main:src/index.css
 * @see docs/CONVENTIONS.md (styling), docs/COMPONENT_MAP.md
 */
export function PageShell({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
