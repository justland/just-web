# @just-web/presets-browser

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[`@just-web/presets-browser`] provides common browser features using specific set of libraries.

This presets includes:

- [@just-web/browser](https://www.npmjs.com/package/@just-web/browser)
- [@just-web/browser-preferences](https://www.npmjs.com/package/@just-web/browser-preferences)
- [@just-web/history](https://www.npmjs.com/package/@just-web/history)

As a presets, you do not need to install any of the included packages yourself.

This presets depends on:

- [@just-web/commands](https://www.npmjs.com/package/@just-web/commands)
- [@just-web/keyboard](https://www.npmjs.com/package/@just-web/keyboard) (Optional)

## Install

```sh
# npm
npm install @just-web/presets-browser

# yarn
yarn add @just-web/presets-browser

# pnpm
pnpm install @just-web/presets-browser

#rush
rush add -p @just-web/presets-browser
```

## Usage

```ts
import { justApp } from '@just-web/app'
import { commandsGizmoFn } from '@just-web/commands'
import { keyboardGizmoFn } from '@just-web/keyboard' // optional
import { presetsBrowserGizmoFn } from '@just-web/presets-browser'

const app = await justApp({ name: 'your-awesome-app' })
  .with(commandsGizmoFn())
  .with(keyboardGizmoFn())
  .with(presetsBrowserGizmoFn())
  .create()
```

[`@just-web/presets-browser`]: https://github.com/justland/just-web/tree/main/plugins/presets-browser
[downloads-image]: https://img.shields.io/npm/dm/@just-web/presets-browser.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-web/presets-browser
[npm-image]: https://img.shields.io/npm/v/@just-web/presets-browser.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-web/presets-browser
