# @just-web/keyboard

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[@just-web/keyboard] provides functionality about keyboards:

- ✅ Key bindings: shortcuts for all platforms.
- 💡 Key stroke simulation
- 💡 Virtual Keyboard
- 💡 Key stroke capture and display

## Install

```sh
# npm
npm install @just-web/keyboard

# yarn
yarn add @just-web/keyboard

# pnpm
pnpm install @just-web/keyboard

#rush
rush add -p @just-web/keyboard
```

## Usage

```ts
import { justApp } from '@just-web/app'
import { keyboardGizmoFn } from '@just-web/keyboard'

const app = await justApp({ name: 'your-awesome-app' })
  .with(keyboardGizmoFn())
  .create()

app.keyboard.keyBindingContributions
```

It provides a `keyBindingContributions` to register key bindings.

Typically, you don't need to use it directly.
Instead, use `command()` from [@just-web/command](../command/README.md).

[@just-web/keyboard]: https://github.com/justland/just-web/tree/main/plugins/keyboard
[downloads-image]: https://img.shields.io/npm/dm/@just-web/keyboard.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-web/keyboard
[npm-image]: https://img.shields.io/npm/v/@just-web/keyboard.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-web/keyboard
