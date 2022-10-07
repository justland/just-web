# @just-web/browser-keyboard

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[@just-web/browser-keyboard] provides browser specific implementation for [@just-web/keyboard].

## Install

```sh
# npm
npm install @just-web/browser-keyboard

# yarn
yarn add @just-web/browser-keyboard

# pnpm
pnpm install @just-web/browser-keyboard

#rush
rush add -p @just-web/browser-keyboard
```

## Usage

```ts
import { createApp } from '@just-web/app'
import keyboardPlugin from '@just-web/keyboard'
import commandsPlugin from '@just-web/commands'
import osPlugin from '@just-web/os'
import browserKeyboadrPlugin from '@just-web/browser-keyboard'

createApp({ name: 'your-awesome-app' })
  .extend(keyboardPlugin())
  .extend(commandsPlugin())
  .extend(osPlugin())
  .extend(browserKeyboardPlugin())
```

## To-do

- Listen to key bindings change and add new key bindings

[@just-web/browser-keyboard]: https://github.com/justland/just-web/tree/main/plugins/browser-keyboard
[@just-web/keyboard]: https://github.com/justland/just-web/tree/main/plugins/keyboard
[downloads-image]: https://img.shields.io/npm/dm/@just-web/browser-keyboard.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-web/browser-keyboard
[npm-image]: https://img.shields.io/npm/v/@just-web/browser-keyboard.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-web/browser-keyboard
