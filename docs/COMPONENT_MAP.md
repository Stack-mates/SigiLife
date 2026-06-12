# COMPONENT_MAP — who mounts what

**Rule:** update this file when the component tree changes (CLAUDE.md
definition of done). `[c]` = client component, `[s]` = server component.

## Tree

```
app/layout.tsx [s] ........................ fonts, globals.css, <UserProvider>
├── app/page.tsx [s] ...................... Landing
│   └── auth/GoogleSignInButton [c]
├── (auth)/create-profile/page.tsx [s]
│   └── auth/ProfileForm [c] .............. username, avatar pick, home location, theme
└── (app)/layout.tsx [s] .................. SESSION GATE · layout/Menu · TutorialProvider
    ├── home/page.tsx [s] ................. The Office hub
    │   └── (art hotspot links — no dedicated component; PageShell + Lino art)
    ├── make-sigil/layout.tsx [c] ......... <MakeSigilProvider> wizard shell
    │   ├── write/page.tsx ................ sigil/WriteSigil [c]
    │   ├── draw/page.tsx ................. sigil/DrawSigilCanvas [c]
    │   └── style/page.tsx ................ sigil/StyleSigil [c]
    ├── charge-sigil/[sigilId]/page.tsx ... charge/ChargeRitual [c]
    │   ├── charge/EmotionPicker [c]
    │   └── charge/SplashCursor [c] ....... fluid sim canvas
    ├── destroy-sigil/[sigilId]/page.tsx .. destroy/DestroyRitual [c]
    │   ├── charge/EmotionPicker [c] ...... (shared)
    │   ├── destroy/EvilEye [c] ........... OGL WebGL eye
    │   └── destroy/GhostCursor [c]
    ├── grimoire/layout.tsx [s] ........... grimoire/GrimoireBook (book frame)
    │   ├── page.tsx [s] .................. LeftPage(profile) + RightPage(library)
    │   ├── map/page.tsx .................. map/WorldMap [c]
    │   │   ├── map/SigilMarker [c]
    │   │   └── map/VotePanel [c]
    │   ├── library/page.tsx [s] .......... grid of sigil/SigilThumb [s]
    │   ├── sigil/[sigilId]/page.tsx [s] .. detail; sigil/SigilRenderer, map/VotePanel [c]
    │   ├── profile/page.tsx [s] .......... stats card
    │   ├── friends/page.tsx [s] .......... social/UserSearch [c], social/FriendsList [c]
    │   │   └── social/FollowButton [c]
    │   └── settings/page.tsx [s] ......... settings form (server action candidate)
    ├── place-sigil/[sigilId]/page.tsx .... map/WorldMap [c] + map/MapSearchBox [c]
    ├── ar/[sigilId]/page.tsx ............. ar/ArViewer [c] (flag-gated)
    └── premium/page.tsx [s] .............. premium/UpgradeCard [c], premium/SlotMeter [s]

Cross-cutting:
  layout/PageShell [s] ......... full-bleed Lino room background + glasscard slot
  layout/Menu [c] .............. hamburger nav (mounted by (app)/layout)
  layout/NextButton [c] ........ wizard step nav
  tutorial/TutorialOverlay [c] . step engine; tutorial/TutorialCharacter [c] (Harper/Bennet)
  premium/PaywallGate [c] ...... wraps premium-only UI; reads entitlements
  ui/* ......................... primitives (button, card, …) — shadcn-style
```

## Old → new mapping (v1 paths on `main` under `src/components/`)

| v1 component | Rebuild |
|---|---|
| `LogInAuth/LandingPage.tsx` | `app/page.tsx` + `auth/GoogleSignInButton` |
| `LogInAuth/GoogleAuth.tsx` | Auth.js — no custom component needed |
| `LogInAuth/CreateProfile.tsx` | `auth/ProfileForm` |
| `LogInAuth/ProtectedRoute.tsx` | `(app)/layout.tsx` session gate |
| `SigilRoomHome/HomeRoom.tsx` | `(app)/home/page.tsx` |
| `MakeSigil/MakeSigil.tsx` (slot gate) | slot check moved into `POST /api/sigils` + `premium/SlotMeter` |
| `MakeSigilComponents/WriteSigil.tsx` | `sigil/WriteSigil` + `lib/sigil/extractSigilCharacters.ts` |
| `MakeSigilComponents/DrawSigil.tsx` | `sigil/DrawSigilCanvas` (draw) + `sigil/StyleSigil` (style — was one file doing both) |
| `MakeSigilComponents/SaveSigil.tsx` | `sigil/StyleSigil` save section + `map/MapSearchBox` |
| `ChargeSigil/SigilCharge.tsx` | `charge/ChargeRitual` |
| `ChargeComponents/ChangeEmotion.tsx` | `charge/EmotionPicker` |
| `ChargeComponents/SplashCursor.tsx` | `charge/SplashCursor` |
| `DestroySigil/SigilDestroy.tsx` | `destroy/DestroyRitual` |
| `DestroyComponents/EvilEye.tsx`, `GhostCursor.tsx` | `destroy/EvilEye`, `destroy/GhostCursor` |
| `Grimoire/Grimoire.tsx` | `grimoire/layout.tsx` + `grimoire/GrimoireBook` |
| `LeftPage/Map/MapBox.tsx` | `map/WorldMap` |
| `LeftPage/Map/MapSearchBox.tsx` | `map/MapSearchBox` |
| `LeftPage/Map/PlaceSigilInWorld.tsx` | `ar/ArViewer` + `app/(app)/ar/[sigilId]` |
| `LeftPage/Profile/UserProfile.tsx` | `grimoire/profile/page.tsx` |
| `LeftPage/Profile/UserFriends.tsx` | `social/FriendsList` + `social/UserSearch` |
| `LeftPage/Profile/UserSettings.tsx` | `grimoire/settings/page.tsx` |
| `ScryeFriends/*` | `grimoire/friends/page.tsx` (merged) |
| `RightPage/SigiLibrary/SigiLibrary.tsx` | `grimoire/library/page.tsx` |
| `RightPage/SigiLibrary/SigilPage.tsx` | `grimoire/sigil/[sigilId]/page.tsx` |
| `RightPage/SigiLibrary/SigilThumb.tsx` | `sigil/SigilThumb` |
| `Parts/Menu.tsx`, `Parts/NextButton.tsx` | `layout/Menu`, `layout/NextButton` |
| `Tutorial/*` | `tutorial/*` |
| `Profile/PresentationQR.tsx`, `PresentationSignup.tsx` | dropped (bootcamp-demo only) |
