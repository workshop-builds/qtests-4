# Plan

Milestones with verifiable acceptance criteria. Each milestone ships something that works.

## Milestone 1: Counter page with a big button

Replace the project page with the product: a counter in the middle of the page and one big button that adds 1. It is in memory only for now.

Acceptance criteria:
- `npm run build` and `npm test` pass.
- On load, the page shows the counter `0` centered on the page and one large `<button>` labeled to add one (for example "+1").
- One click on the button makes the counter show `1`. Three clicks in total show `3`. A test covers this.
- The button works from the keyboard (Enter/Space on the focused button), as a native `<button>` does.
- The counter element has `aria-live="polite"`.
- The layout works at 375px and 1280px widths: the button is at least 120px tall and the counter text is at least 4rem.

## Milestone 2: Counter saved in the browser

Persist the counter in `localStorage` so it survives a refresh.

Acceptance criteria:
- `npm run build` and `npm test` pass.
- Every change writes the value to `localStorage` under the key `qtests.counter`.
- On load, the counter starts from the stored value. A test sets `qtests.counter` to `"41"`, renders the app, and sees `41`. One click shows `42` and stores `"42"`.
- A missing, non-numeric, negative or non-integer stored value reads as `0`, and the app does not crash. Tests cover `null`, `"abc"`, and `"-5"`.
- If `localStorage` is not available (for example, it throws), the counter still works in memory. A test covers this.
- Manual check: click a few times, refresh the page, and the same number is shown.
