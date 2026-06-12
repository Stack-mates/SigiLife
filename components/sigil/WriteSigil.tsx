"use client";

/**
 * WriteSigil — intention input with live character extraction.
 * STATUS: implemented (profanity check deferred to server save — auth/DB milestone)
 *
 * Extraction rules (see lib/sigil/extractSigilCharacters): keep consonants,
 * accented consonants, and symbols; strip vowels, spaces, digits, duplicates
 * (first instance wins, case-insensitive for letters). The kept characters
 * preview live as chips — they become the editable letterforms on the canvas.
 *
 * @see docs/features/make-sigil.md
 */
import { useRouter } from "next/navigation";
import { useMakeSigil } from "@/context/MakeSigilProvider";

const MAX_INTENTION_LENGTH = 280;

export function WriteSigil() {
  const router = useRouter();
  const { draft, characters, setIntention, canDraw } = useMakeSigil();

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 pb-12">
      <header className="text-center">
        <h1 className="font-serif text-3xl text-zinc-50">Write your intention</h1>
        <p className="mt-2 text-sm text-zinc-400">
          State it as if it is already true. Its letters become your sigil&apos;s raw material.
        </p>
      </header>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 backdrop-blur">
        <textarea
          value={draft.intention}
          onChange={(e) => setIntention(e.target.value.slice(0, MAX_INTENTION_LENGTH))}
          placeholder="I move through this season with steady hands…"
          rows={4}
          autoFocus
          className="w-full resize-none bg-transparent text-lg leading-relaxed text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
        />
        <div className="mt-2 text-right text-xs tabular-nums text-zinc-500">
          {draft.intention.length}/{MAX_INTENTION_LENGTH}
        </div>
      </div>

      <section aria-live="polite">
        <h2 className="mb-3 text-center text-xs uppercase tracking-[0.2em] text-zinc-500">
          Distilled characters
        </h2>
        {characters.length === 0 ? (
          <p className="text-center text-sm text-zinc-600">
            Nothing yet — vowels, spaces, and numbers boil away.
          </p>
        ) : (
          <ul className="flex flex-wrap justify-center gap-2">
            {characters.map((c) => (
              <li
                key={c}
                className="grid size-11 place-items-center rounded-xl border border-violet-800/60 bg-violet-950/40 font-serif text-xl text-violet-200 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
              >
                {c}
              </li>
            ))}
          </ul>
        )}
      </section>

      <button
        type="button"
        disabled={!canDraw}
        onClick={() => router.push("/make-sigil/draw")}
        className="mx-auto rounded-full bg-violet-600 px-8 py-3 font-medium text-white transition enabled:hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Begin drawing →
      </button>
    </div>
  );
}
