# @just-web/fetch

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[@just-web/fetch] provides fetch API for a [@just-web] applications.

## Install

```sh
# npm
npm install @just-web/fetch

# yarn
yarn add @just-web/fetch

# pnpm
pnpm install @just-web/fetch

#rush
rush add -p @just-web/fetch
```

## Migration

### 2.0.0

- Removed automatic importing `cross-fetch/polyfill` in testing entry.
- Consumers running in Node environments (without native `fetch`) must now provide their own polyfill — for example, by using `undici` or importing `cross-fetch` explicitly in their test setup.
- This change resolves ESM compatibility issues encountered when using Vitest, as the previous `cross-fetch/polyfill` import relied on CommonJS semantics.

## Usage

```ts
import { justApp } from '@just-web/app'
import { fetchGizmo } from '@just-web/fetch'

const app = await justApp({ name: 'your-awesome-app' })
  .with(fetchGizmo)
  .create()

app.fetch(...)
```

## Testing

[@just-web/fetch] provides a `fetchTestGizmoFn()` under `@jest-web/fetch/testing`.

It can be used during tests to stub the fetch behavior.

```ts
import { justTestApp } from '@just-web/app/testing'
import { fetchTestGizmoFn } from '@just-web/fetch/testing'

const app = await justTestApp().with(fetchTestGizmoFn({
  fetch(...args) { /* ..snap.. */ }
}))
```

[@just-web]: https://github.com/justland/just-web
[@just-web/fetch]: https://github.com/justland/just-web/tree/main/plugins/fetch
[downloads-image]: https://img.shields.io/npm/dm/@just-web/fetch.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-web/fetch
[npm-image]: https://img.shields.io/npm/v/@just-web/fetch.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-web/fetch
