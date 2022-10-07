# @just-web/browser

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[`@just-web/browser`] provides browser specific implementations for core features for a `@just-web` applications.

Architecturally, under the lens of [Clean Architecture],
[`@just-web/browser`] provides the adaptors and external details related to browsers.

## Install

```sh
# npm
npm install @just-web/browser

# yarn
yarn add @just-web/browser

# pnpm
pnpm install @just-web/browser

#rush
rush add -p @just-web/browser
```

## Usage

```ts
import { createApp } from '@just-web/app'
import browserPlugin from '@just-web/browser'

createApp({ name: 'your-awesome-app' }).extend(browserPlugin())
```

[`@just-web/browser`]: https://github.com/justland/just-web/tree/main/plugins/browser
[Clean Architecture]: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
[downloads-image]: https://img.shields.io/npm/dm/@just-web/browser.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-web/browser
[npm-image]: https://img.shields.io/npm/v/@just-web/browser.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-web/browser
