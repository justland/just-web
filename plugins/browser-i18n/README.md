# @just-web/browser-i18n

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[@just-web/browser-i18n] provides basic i18n support for browser.

The setting is persisted in local storage.

## Install

```sh
# npm
npm install @just-web/i18n

# yarn
yarn add @just-web/i18n

# pnpm
pnpm install @just-web/i18n

#rush
rush add -p @just-web/i18n
```

## Usage

```ts
import { justApp } from '@just-web/app'
import { i18nGizmoFn } from '@just-web/i18n'

const app = await justApp({ name: 'your-app' })
  .with(i18nGizmoFn(navigator))
  .create()

app.i18n.getLanguage() // 'en'
```

## Commands

It provides a `setLanguageCommand`,
which allows you to set language using command.

```ts
import { justApp } from '@just-web/app'
import { commandsGizmoFn } from '@just-web/commands' // optional
import { keyboardGizmoFn } from '@just-web/keyboard' // optional
import { i18nGizmoFn } from '@just-web/i18n'

const app = await justApp({ name: 'your-app' })
  .with(commandsGizmoFn())
  .with(keyboardGizmoFn())
  .with(i18nGizmoFn(navigator))
  .create()

setLanguageCommand('fr')
```

[@just-web/browser-i18n]: https://github.com/justland/just-web/tree/main/plugins/browser-i18n
[downloads-image]: https://img.shields.io/npm/dm/@just-web/preferences.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-web/preferences
[npm-image]: https://img.shields.io/npm/v/@just-web/preferences.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-web/preferences
