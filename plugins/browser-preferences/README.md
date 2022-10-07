# @just-web/browser-preferences

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[@just-web/browser-preferences] provides the implementation of [@just-web/preferences] on the browser.

## Install

```sh
# npm
npm install @just-web/browser-preferences

# yarn
yarn add @just-web/browser-preferences

# pnpm
pnpm install @just-web/browser-preferences

#rush
rush add -p @just-web/browser-preferences
```

## Depends on

- [@just-web/keyboard]: dependency of [@just-web/commands]
- [@just-web/commands]
- [@just-web/preferences]

## Usage

```ts
import { createApp } from '@just-web/app'
import keyboardPlugin from '@just-web/keyboard'
import commandsPlugin from '@just-web/commands'
import preferencesPlugin from '@just-web/preferences'
import bpPlugin from '@just-web/browser-preferences'

const app = createApp({name: 'your-awesome-app'})
  .extend(keyboardPlugin())
  .extend(commandsPlugin())
  .extend(perferencesPlugin())
  .extend(bpPlugin())

await app.start()

// using the `preferences` API.
app.preferences.get(...)
app.preferences.set(...)
app.preferences.clear(...)
app.preferences.clearAll()
```

[@just-web/browser-preferences]: https://github.com/justland/just-web/tree/main/plugins/browser-preferences
[@just-web/commands]: https://github.com/justland/just-web/tree/main/plugins/commands
[@just-web/keyboard]: https://github.com/justland/just-web/tree/main/plugins/keyboard
[@just-web/preferences]: https://github.com/justland/just-web/tree/main/plugins/preferences
[downloads-image]: https://img.shields.io/npm/dm/@just-web/browser-preferences.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-web/browser-preferences
[npm-image]: https://img.shields.io/npm/v/@just-web/browser-preferences.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-web/browser-preferences
