/**
 * PageShell — full-bleed atmospheric background with a centered content slot.
 * STATUS: implemented (server component)
 *
 * Props: { art?: public-path to a Lino background; children; className? }.
 * Renders the art faintly behind a dark wash so foreground content stays
 * readable across themes. Uses a plain <img> (not next/image) because the
 * art is decorative local SVG — next/image's optimizer rejects SVG without
 * dangerouslyAllowSVG, and optimization buys nothing for a full-bleed wash.
 *
 * @see docs/CONVENTIONS.md (styling), docs/PRODUCT_SPEC.md
 */
export function PageShell({
  art,
  children,
  className = "",
}: {
  art?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={"relative min-h-dvh overflow-hidden bg-zinc-950 text-zinc-100 " + className}>
      {art && (
        // eslint-disable-next-line @next/next/no-img-element -- decorative local SVG
        <img
          src={art}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 size-full select-none object-cover opacity-[0.12]"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/10 to-zinc-950" aria-hidden />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
