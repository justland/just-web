# @just-web/preferences

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[@just-web/preferences] plugin defines the interface of get and set user preferences.

Where the preferences are saved depends on how it is implemented in the details.

You will need one of the following plugin, or create your own:

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

```ts
import { createApp } from '@just-web/app'
import commandsPlugin from '@just-web/commands'
import keyboardPlugin from '@just-web/keyboard' // optional
import preferencesPlugin from '@just-web/preferences'
import browserPreferencesPlugin from '@just-web/browser-preferences'

const app = createApp({ name: 'your-app' })
  .extend(commandsPlugin())
  .extend(keyboardPlugin())
  .extend(preferencesPlugin())
  .extend(browserPreferencesPlugin())
```

[@just-web/preferences]: https://github.com/justland/just-web/tree/main/plugins/preferences
[@just-web/browser-preferences]: https://github.com/justland/just-web/tree/main/plugins/browser-preferences
[downloads-image]: https://img.shields.io/npm/dm/@just-web/preferences.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-web/preferences
[npm-image]: https://img.shields.io/npm/v/@just-web/preferences.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-web/preferences
