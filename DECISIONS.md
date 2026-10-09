# Decisions

One entry per decision: date, decision, why.

## 2026-10-09: The request fits the safety perimeter; build it as asked

The request (PROJECT.md) is one static web page with a button that adds 1 to a counter, and the counter is saved in the browser. It has no backend, accounts, payments, wallets, token features, personal data, or third-party calls. Nothing needs to change or be left out, so there is no declared alternative.

## 2026-10-09: Store the counter in `localStorage`

"Saved in the browser" is met most simply by `localStorage`, using one key (`qtests.counter`). If the stored value is missing or bad, the counter reads as 0. It stays per browser and per device, with no sync. That matches "Nothing else."

## 2026-10-09: Stack is Vite + React + TypeScript + Tailwind, static build, Vitest for tests

This is the starter stack. The output in `dist/` is plain static files that any static host can serve.

## 2026-10-09: The project page reads PLAN.md directly

The opening project page imports `PLAN.md` as raw text and lists its milestone headings. This way the page cannot drift from the plan.
