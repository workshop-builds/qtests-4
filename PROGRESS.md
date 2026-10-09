# Progress

One entry per work session: date, model, what changed, what is next.

## 2026-10-09: Opening session (claude-opus-5-5)

What changed:
- Read PROJECT.md. The request (a static click counter saved in the browser) fits the safety perimeter, so there is no declared alternative. Recorded in DECISIONS.md.
- Wrote BLUEPRINT.md (product, audience, shape of the first version) and PLAN.md (2 milestones with acceptance criteria).
- Set up the starter stack: Vite + React + TypeScript + Tailwind (v4 via `@tailwindcss/vite`), static build, Vitest + Testing Library (jsdom).
- First page is the project page. It shows the project name, what it will be, and the milestone list, read straight from PLAN.md.
- Tests: the project page renders the name, description and milestones, plus a unit test for the milestone parser. `npm test` and `npm run build` pass.
- Milestone 1 not started.

Next: Milestone 1, the counter page with a big button.

## 2026-10-09: Milestone 1 (claude-sonnet-5-5)

What changed:
- Replaced the project page with the counter page: the counter (`aria-live="polite"`, text-7xl, text-9xl from `sm` up) centered, and one native `<button>` labeled "+1" (min height 10rem, full width up to max-w-md). In memory only.
- Removed the PLAN.md-reading code (`src/plan.ts`) since the project page is gone.
- Tests: initial 0, one click shows 1, three clicks show 3, Enter/Space on the focused button (user-event), aria-live, size classes. Added the `@testing-library/user-event` dev dependency and DOM cleanup after each test.
- `npm test` and `npm run build` pass.

Next: Milestone 2, save the counter in `localStorage` under `qtests.counter`.
