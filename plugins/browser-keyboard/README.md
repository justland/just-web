# @just-web/browser-keyboard

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
