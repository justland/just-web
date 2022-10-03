# @just-web/browser-preferences

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

- [@just-web/contributions]: dependency of [@just-web/commands]
- [@just-web/commands]
- [@just-web/preferences]

## Usage

```ts
import { createApp } from '@just-web/app'
import contributionsPlugin from '@just-web/contributions'
import commandsPlugin from '@just-web/commands'
import preferencesPlugin from '@just-web/preferences'
import bpPlugin from '@just-web/browser-preferences'

const app = createApp({name: 'your-awesome-app'})
  .extends(contributionsPlugin())
  .extends(commandsPlugin())
  .extends(perferencesPlugin())
  .extend(bpPlugin())

// using the `preferences` API.
app.preferences.get(...)
app.preferences.set(...)
app.preferences.clear(...)
app.preferences.clearAll()
```

[@just-web/browser-preferences]: https://github.com/justland/just-web/tree/main/plugins/browser-preferences
[@just-web/contributions]: https://github.com/justland/just-web/tree/main/plugins/contributions
[@just-web/commands]: https://github.com/justland/just-web/tree/main/plugins/commands
[@just-web/preferences]: https://github.com/justland/just-web/tree/main/plugins/preferences
