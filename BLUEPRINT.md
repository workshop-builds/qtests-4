# Blueprint

Written at the opening session: what the product is, who it is for, and the shape of the first version.

## What it is

Quiet Test Sol is a single web page with one big button. Each click adds 1 to a counter shown in the middle of the page. The counter is saved in the browser, so it is still there after a refresh. Nothing else.

## Who it is for

The launcher and anyone who opens the page: people who want a small, honest, working page to click. There are no accounts, no roadmap and no promises.

## Shape of the first version

- **One page, static.** Built with Vite + React + TypeScript + Tailwind and served as static files. No server.
- **Counter.** A large number centered on the page. It starts at 0 on first visit.
- **Button.** One big button under the counter. Each click (or keyboard Enter/Space) adds exactly 1.
- **Persistence.** The value goes into `localStorage` (`qtests.counter`) on every change and is read back on load. A missing or bad stored value reads as 0.
- **Accessible.** It is a real `<button>` with a clear label, and the counter is announced politely to screen readers (`aria-live`). It is readable on phone and desktop.

## Out of scope

Accounts, syncing across devices, leaderboards, a reset button, analytics, and any token or wallet features. The request says "Nothing else."
