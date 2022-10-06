# @just-web/keyboard

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
import { createApp } from '@just-web/app'
import keyboardPlugin from '@just-web/keyboard'
import osPlugin from '@just-web/os'

creatApp({ name: 'your-awesome-app' })
  .extend(osPlugin())
  .extend(keyboardPlugin())
```

## Depends On

- [@just-web/os]

[@just-web/keyboard]: https://github.com/justland/just-web/tree/main/plugins/keyboard
[@just-web/os]: https://github.com/justland/just-web/tree/main/plugins/os
