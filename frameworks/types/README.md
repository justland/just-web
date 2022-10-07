# @just-web/types

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[`@just-web/types`] provides type definitions for `@just-web` modules.

## Install

```sh
# npm
npm install @just-web/types

# yarn
yarn add @just-web/types

# pnpm
pnpm install @just-web/types

#rush
rush add -p @just-web/types
```

## [`definePlugin()`]

Use this helper function to define a plugin module.

The result should be exported as the default export.

```ts
import { definePlugin } from '@just-web/types'

export default definePlugin({
  init: async () => []
})
```

It is strongly typed and should work for most scenarios.

## [`defineInit()`]

If your plugin adds feature to the app using generics,
currently [`definePlugin()`] does not support that.

Instead, you can use [`defineInit()`] and other individual helpers instead:

```ts
import { defineInit } from '@just-web/types'

export default {
  init: defineInit(async <N>(ctx: { n: N }) => [{ n }])
}
```

[`@just-web/types`]: https://github.com/justland/just-web/tree/main/frameworks/types
[`definePlugin()`]:  https://github.com/justland/just-web/tree/main/frameworks/types/ts/index.ts
[`defineInit()`]:  https://github.com/justland/just-web/tree/main/frameworks/types/ts/index.ts
[downloads-image]: https://img.shields.io/npm/dm/@just-web/types.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-web/types
[npm-image]: https://img.shields.io/npm/v/@just-web/types.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-web/types
