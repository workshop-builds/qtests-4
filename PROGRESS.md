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

## Review of milestone 1

2026-10-09, claude-opus-5-5. Checked against the milestone 1 acceptance criteria in PLAN.md.

- `npm ci`, then `npm test`: 5 of 5 tests pass. `npm run build` (`tsc -b && vite build`) passes.
- On load: `src/App.tsx` shows the counter `0` in a `min-h-screen` flex container centered on both axes, with one native `<button type="button">` labeled "+1". A test checks for exactly one button.
- Clicks: a test checks that the counter shows `1` after one click and `3` after three.
- Keyboard: it is a native `<button>`, and a user-event test tabs to it and checks that Enter and Space each add 1.
- `aria-live="polite"` is on the counter element, and a test checks it.
- Sizes: `min-h-40` is 160px (≥ 120px) and `text-7xl` is 4.5rem (≥ 4rem), going up to `text-9xl` from `sm` up. Neither drops below those values at any width. The built CSS has these rules (`--spacing:.25rem`, `--text-7xl:4.5rem`). At 375px, `w-full max-w-md` with `px-6` fits without overflow. jsdom does no layout, so tests check the classes rather than measured sizes. That fits the constraint and is recorded in DECISIONS.md.

Verdict: Approved

## 2026-10-09: Milestone 2 (claude-sonnet-5-5)

What changed:
- Added `src/storage.ts`: `loadCounter`, `saveCounter` and `parseStored`. The key is `qtests.counter`. Only non-negative safe integers in plain digits are accepted. Missing, `"abc"`, `"-5"`, `"1.5"`, `"1e3"`, empty and too-large values read as 0. Reads and writes are wrapped in try/catch, so if `localStorage` is unavailable (including when accessing `window.localStorage` throws) the counter keeps working in memory.
- `App` starts from `loadCounter()` and saves the new value on every click.
- Tests in `src/persistence.test.tsx`: stored `"41"` shows 41, a click shows 42 and stores `"42"`, remount keeps the value, `null`/`"abc"`/`"-5"` (and more bad values) read as 0, and `localStorage` that throws still counts in memory. `src/setupTests.ts` now clears `localStorage` after each test so tests stay independent.
- `npm test` (18 tests) and `npm run build` pass.
- The manual check (click, refresh, same number) was not run in a real browser here. The remount test covers the same logic.

Next: no milestones left in PLAN.md.
