# @just-web/presets-browser

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[`@just-web/presets-browser`] provides common browser features using specific set of libraries.

This presets includes:

- [@just-web/browser](https://www.npmjs.com/package/@just-web/browser)
- [@just-web/browser-preferences](https://www.npmjs.com/package/@just-web/browser-preferences)
- [history](https://www.npmjs.com/package/history)

As a presets, you do not need to install any of the included packages yourself.

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
import { createApp } from '@just-web/app'
import browserPresetsPlugin from '@just-web/presets-browser'

createApp({ name: 'your-awesome-app' }).extend(browserPresetsPlugin())
```

[`@just-web/presets-browser`]: https://github.com/justland/just-web/tree/main/plugins/presets-browser
[downloads-image]: https://img.shields.io/npm/dm/@just-web/presets-browser.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-web/presets-browser
[npm-image]: https://img.shields.io/npm/v/@just-web/presets-browser.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-web/presets-browser
