# @just-web/preferences

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[@just-web/preferences] plugin defines the interface of get and set user preferences.

Where the preferences are saved depends on how it is implemented in the details.

This package provides a `memoryPreferencesGizmo` that stores preferences in memory.
But in practice, most likely you should use a different implementation such as:

- [@just-web/browser-preferences]: Save preference in browser local storage.
- 🚧 `@just-web/service-preferences`: Save preference in a remote service.

## Install

```sh
# npm
npm install @just-web/preferences

# yarn
yarn add @just-web/preferences

# pnpm
pnpm install @just-web/preferences

#rush
rush add -p @just-web/preferences
```

## Usage

Here is how to use `memoryPreferencesGizmo`:

```ts
import { justApp } from '@just-web/app'
import { commandsGizmoFn } from '@just-web/commands'
import { keyboardGizmoFn } from '@just-web/keyboard' // optional
import { memoryPreferencesGizmo } from '@just-web/preferences'

const app = await justApp({ name: 'your-app' })
  .with(commandsGizmoFn())
  .with(keyboardGizmoFn())
  .with(memoryPreferencesGizmo)
  .create()
```

[@just-web/preferences]: https://github.com/justland/just-web/tree/main/plugins/preferences
[@just-web/browser-preferences]: https://github.com/justland/just-web/tree/main/plugins/browser-preferences
[downloads-image]: https://img.shields.io/npm/dm/@just-web/preferences.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-web/preferences
[npm-image]: https://img.shields.io/npm/v/@just-web/preferences.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-web/preferences
