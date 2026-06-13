"use client";

/**
 * TutorialCharacter — Harper Crowe / Bennet Voss portrait + nameplate.
 * STATUS: implemented
 *
 * Portraits: public/art/HarperPortrait.svg, public/art/BennetPortrait.svg.
 * Dimmed when not the active speaker (in "both" steps).
 *
 * @see docs/features/tutorial.md
 */
const PORTRAITS = {
  harper: { src: "/art/HarperPortrait.svg", name: "Harper Crowe" },
  bennet: { src: "/art/BennetPortrait.svg", name: "Bennet Voss" },
} as const;

export function TutorialCharacter({
  who,
  active,
}: {
  who: "harper" | "bennet";
  active: boolean;
}) {
  const { src, name } = PORTRAITS[who];
  return (
    <div className={"flex flex-col items-center gap-1 transition " + (active ? "opacity-100" : "opacity-40")}>
      {/* eslint-disable-next-line @next/next/no-img-element -- local SVG portrait */}
      <img src={src} alt={name} width={72} height={72}
        className="size-16 rounded-full border border-zinc-700 bg-zinc-900 object-cover sm:size-20" />
      <span className="text-xs text-zinc-400">{name}</span>
    </div>
  );
}
