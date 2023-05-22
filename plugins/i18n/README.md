# @just-web/i18n

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[@just-web/i18n] provides basic i18n support.

The `i18nGizmo` provides changing the language of the application in-memory.
The setting is not persisted.

If you want to persist the setting, you can use other variants such as [@just-web/browser-i18n](../browser-i18n/README.md).

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
  .extend(i18nGizmoFn(navigator))
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
  .extend(commandsGizmoFn())
  .extend(keyboardGizmoFn())
  .extend(i18nGizmoFn(navigator))
  .create()

setLanguageCommand('fr')
```

[@just-web/i18n]: https://github.com/justland/just-web/tree/main/plugins/i18n
[downloads-image]: https://img.shields.io/npm/dm/@just-web/preferences.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-web/preferences
[npm-image]: https://img.shields.io/npm/v/@just-web/preferences.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-web/preferences
