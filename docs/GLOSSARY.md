# GLOSSARY — SigiLife Domain Language

Use these terms exactly, in UI copy, code identifiers, commit messages, and
docs. The fiction is the product; sloppy language breaks it.

| Term | Meaning |
|---|---|
| **Sigil** | A personal symbol drawn by a user, distilled from an intention. The core object of the app. |
| **Intention** | The statement a user writes to begin a sigil (e.g. "I will finish what I start"). Stored on the sigil; profanity-filtered. |
| **Character extraction** | The crafting rule: strip vowels (incl. accented), spaces, digits, and duplicates from the intention — keeping consonants, accented consonants, and symbols, first instance wins. Implemented in `lib/sigil/extractSigilCharacters.ts`. |
| **Letterform vectors** | SVG path data for each extracted character, traced at runtime from the sigil font (`lib/sigil/traceGlyphs.ts`, ADR-008) and placed on the canvas as editable vector raw material. |
| **Charge** | The ritual of empowering a sigil with an emotion (Hope, Grief, Relief, Joy, Longing) through the fluid-trace interaction. A sigil "is charged"; never "liked" or "upvoted". |
| **Destroy** | The ritual of releasing a sigil when its work is done — the evil-eye ceremony. Destruction is a **lifecycle state** (`status: DESTROYED`), not row deletion. Never say "delete" in UI. |
| **Charge score / Destroy score** | Community vote tallies on a sigil (✨ / 🔥). One vote per user per sigil; voting the same way twice retracts it. |
| **Sigil slot** | A user's capacity to hold active sigils. Free tier: 12 slots (v1 carryover). Premium: more/unlimited — see docs/features/monetization.md. |
| **The Office** | The home hub room. The fiction: a paranormal detective agency the user reports to. |
| **Grimoire** | The user's spellbook — the two-page book UI containing the map, library, profile, and friends. |
| **Library** | The right-hand grimoire page: grid of the user's sigils. |
| **Scrye / ScryeFriends** | The social surface — peering at friends through the scrying mirror. "Scrye" is the in-fiction verb for viewing friends' activity. |
| **SigiFriends** | Mutual follows. Sigils can be shared with SigiFriends at creation. |
| **SigiLites** | The people a specific sigil has been shared with (DB: `SigilShare`). |
| **Harper Crowe & Bennet Voss** | The two tutorial characters — agents of The Office who guide onboarding. Portraits in `public/art/`. |
| **Evil eye** | The WebGL eye that presides over the destroy ritual. |
| **Placement** | A sigil's anchor in the world: map placement (lat/lng) or AR placement (position + quaternion in physical space). |
| **Lino** | The hand-made linocut-style art in `public/art/` — the app's visual identity. |
| **Foliage / Cyber** | The two color themes (verdant green / glacial blue), each with light & dark modes. |
