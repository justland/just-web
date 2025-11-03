# @just-web/fetch

## 2.0.0

### Major Changes

- 3dbc733a: ### Major Changes

  - Removed automatic `cross-fetch/polyfill` import from `ts/testing/index.ts`.
  - The testing entry no longer applies a global `fetch` polyfill by default.
  - Consumers running in Node environments (without native `fetch`) must now provide their own polyfill — for example, by using `undici` or importing `cross-fetch` explicitly in their test setup.
  - This change resolves ESM compatibility issues encountered when using Vitest, as the previous `cross-fetch/polyfill` import relied on CommonJS semantics.

## 1.0.2

### Patch Changes

- 62ba2d2e: Bind `fetch`

## 1.0.1

### Patch Changes

- ef288022: Update `typescript` to 5.1.3. This fix the gizmo function type issue.
- Updated dependencies [ef288022]
  - @just-web/app@7.2.1

## 1.0.0

### Major Changes

- 8eeca3e0: Add `fetchGizmo`

### Patch Changes

- Updated dependencies [8eeca3e0]
  - @just-web/app@7.2.0
