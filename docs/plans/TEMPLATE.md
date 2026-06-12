# M<N> Plan — <Name>

<!--
Write this file when the PREVIOUS milestone is wrapping up — never earlier
(see OVERVIEW.md: just-in-time, one milestone ahead max). Source material:
the feature doc, the stub comment blocks, and decisions made during prior
milestones. Delete these comments when filling in.
-->

**Spec:** [../features/<area>.md](../features/<area>.md) ·
**Exit:** <one sentence: the user-visible thing that now works> + all
feature-doc acceptance criteria checked.

## Open questions to resolve FIRST (write answers into the feature doc)
- [ ] <question — with a proposal, so resolving it is a yes/no>

## Dependency gate (ADR each, per ADR-006)
- [ ] <package> — <why now>

## Tasks (ordered; ✎ = doc update in the same PR)

### PR 1 — <coherent slice name; prefer logic-before-UI>
1. <task — name exact files; reference stub comment blocks rather than
   restating them>
   ✎ <which doc row/section this touches>

### PR 2 — <next slice>
…

## Verification (beyond lint/typecheck/build)
- <manual E2E script, ideally phrased as something a phone-holding human does>
- <negative cases: limits, auth failures, validation>
- `git grep "STATUS: stub" <paths this milestone owns>` → empty

## Done = ROADMAP M<N> row checked + write the NEXT milestone's plan from
this template.
