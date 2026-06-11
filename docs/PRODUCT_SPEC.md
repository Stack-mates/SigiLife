# PRODUCT_SPEC — SigiLife

## Vision

People make resolutions and forget them. SigiLife turns intentions into
objects: you distill a statement into a drawn symbol, give it a place in the
real world, and ritually engage with it until it's done its work. It is part
journaling tool, part art toy, part social network — wrapped in the fiction
of a paranormal detective agency ("The Office") that recruits you as an agent.

**Why it can make money:** ritual + creativity + collection is a proven loop
(see: tarot apps, gacha, Finch). Monetization = premium sigil slots, premium
styles/effects, and subscriptions. See [features/monetization.md](features/monetization.md).

## The core loop

1. **Write** an intention → the app extracts its unique consonants.
2. **Draw** a sigil on a canvas seeded with those letterform vectors.
3. **Style** it — stroke color, ring, glow — and name it.
4. **Place** it at a real-world location (Mapbox) and optionally share with SigiFriends.
5. **Charge** it: pick an emotion, trace the sigil through a fluid-light ritual.
6. Others see it on the **map** and vote ✨ charge / 🔥 destroy.
7. When the intention is fulfilled (or abandoned), **destroy** it in the
   evil-eye ritual — freeing the slot and incrementing your destroy count.

The loop is intentionally finite: the 12-slot cap forces destruction, and
destruction is framed as completion, not loss.

## Personas

- **The journaler** — uses it solo as a ritualized goal tracker. Cares about
  the drawing experience and the rituals feeling good.
- **The friend group** — 3–6 people who share sigils and charge each other's.
  Cares about ScryeFriends, sharing, votes.
- **The collector** — wants more slots, rare styles, beautiful grimoire pages.
  This is the paying user.

## User journey (screens)

| # | Screen | Route | Notes |
|---|---|---|---|
| 1 | Landing | `/` | Pitch carousel + Google sign-in. Public. |
| 2 | Create profile | `/create-profile` | Username, avatar, home location, theme. First login only. |
| 3 | The Office (home) | `/home` | Hub room with art hotspots: Make / Charge / Destroy / Grimoire. |
| 4 | Write intention | `/make-sigil/write` | Textarea, live consonant preview, profanity filter. |
| 5 | Draw sigil | `/make-sigil/draw` | Fabric canvas, letterform seeds, draw/manipulate modes, undo/redo. |
| 6 | Style & save | `/make-sigil/style` | Color/ring/glow, name, location, share picker → save. |
| 7 | Charge ritual | `/charge-sigil/[id]` | Emotion picker → fluid-trace ritual → done. |
| 8 | Destroy ritual | `/destroy-sigil/[id]` | Emotion picker → evil-eye ritual → slot freed. |
| 9 | Grimoire | `/grimoire` | Book shell; default spread = profile (left) + library (right). |
| 10 | Map | `/grimoire/map` | All placed sigils, filter mine/all, vote panel. |
| 11 | Library | `/grimoire/library` | Grid of own sigils. |
| 12 | Sigil page | `/grimoire/sigil/[id]` | Detail: image, intention, scores, SigiLites, actions. |
| 13 | Friends | `/grimoire/friends` | Search, follow/unfollow, scrying mirror feed. |
| 14 | Profile / Settings | `/grimoire/profile`, `/grimoire/settings` | Stats; theme/avatar/account management. |
| 15 | Place sigil | `/place-sigil/[id]` | Mapbox search + pin drop. |
| 16 | Premium | `/premium` | Plan comparison, checkout. |
| 17 | AR placement | `/ar/[id]` | 8th Wall surface placement. Flag-gated, post-launch. |

Tutorial overlays (Harper & Bennet) run across screens 3–8 on first use —
see [features/tutorial.md](features/tutorial.md).

## Visual identity

Hand-made Lino-cut art (`public/art/`), glassmorphism cards over full-bleed
room illustrations, two color themes (foliage/cyber) × light/dark. Fonts:
Figtree (body) + decorative faces (Pompiere, New Rocker, Special Elite) for
the occult flavor. Mobile-first: v1 was desktop-scaled; the rebuild treats
phone portrait as the primary viewport (most ritual interactions are touch).

## Non-goals for v1 launch

- Native apps (PWA is enough).
- Real-time anything (no live presence, no websockets).
- Public profiles / discoverability beyond username search.
- AR (scaffolded, but M8 / post-launch).
- Moderation tooling beyond the profanity filter + admin flag.
