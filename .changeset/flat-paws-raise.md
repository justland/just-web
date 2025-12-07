---
'@just-web/fetch': major
---

Removed automatic importing `cross-fetch/polyfill` in testing entry.

- The testing entry no longer applies a global `fetch` polyfill by default.
- Consumers running in Node environments (without native `fetch`) must now provide their own polyfill — for example, by using `undici` or importing `cross-fetch` explicitly in their test setup.
- This change resolves ESM compatibility issues encountered when using Vitest, as the previous `cross-fetch/polyfill` import relied on CommonJS semantics.
