/**
 * SlotMeter — sigil slots used / available.
 * STATUS: implemented (M7)
 *
 * Props: { used: number; limit: number }
 * Shown on /premium and wherever the user needs to see their slot usage.
 * Near-cap: nudge to destroy or upgrade. At-cap: hard warning.
 *
 * Server component — no interactivity needed.
 *
 * @see docs/features/monetization.md
 */

interface SlotMeterProps {
  used: number;
  limit: number;
}

export function SlotMeter({ used, limit }: SlotMeterProps) {
  const ratio = limit > 0 ? Math.min(used / limit, 1) : 0;
  const pct = Math.round(ratio * 100);

  // Determine bar color + nudge copy based on usage.
  const atCap = used >= limit;
  const nearCap = !atCap && used >= limit * 0.8;

  let barColor = "bg-violet-600";
  if (atCap) barColor = "bg-red-500";
  else if (nearCap) barColor = "bg-amber-500";

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-zinc-200 tracking-wide uppercase text-xs">
          Sigil Slots
        </span>
        <span
          className={
            "font-mono font-semibold " +
            (atCap ? "text-red-400" : nearCap ? "text-amber-400" : "text-zinc-200")
          }
        >
          {used} / {limit}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
        <div
          className={"h-full rounded-full transition-all duration-500 " + barColor}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={used}
          aria-valuemin={0}
          aria-valuemax={limit}
          aria-label={`${used} of ${limit} sigil slots used`}
        />
      </div>

      {/* Status copy */}
      {atCap && (
        <p className="text-xs text-red-400 leading-relaxed">
          You&apos;ve reached your limit.{" "}
          <a href="/grimoire/library" className="underline hover:text-red-300">
            Destroy a sigil
          </a>{" "}
          to free a slot, or{" "}
          <a href="/premium" className="underline hover:text-red-300">
            upgrade your caseload
          </a>
          .
        </p>
      )}
      {nearCap && (
        <p className="text-xs text-amber-400 leading-relaxed">
          Running low.{" "}
          <a href="/premium" className="underline hover:text-amber-300">
            Upgrade to expand your caseload
          </a>
          .
        </p>
      )}
    </div>
  );
}
