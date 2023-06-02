# @just-web/formatjs

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[@just-web/formatjs] provides [Format.JS](https://formatjs.io/) support for [@just-web] applications.

## Install

```sh
# npm
npm install @just-web/formatjs

# yarn
yarn add @just-web/formatjs

# pnpm
pnpm install @just-web/formatjs

#rush
rush add -p @just-web/formatjs
```

## Usage

```ts
import { justApp } from '@just-web/app'
import { formatjsGizmo } from '@just-web/formatjs'

justApp({ name: 'your-awesome-app' }).with(formatjsGizmo())
```

[@just-web]: https://github.com/justland/just-web
[@just-web/formatjs]: https://github.com/justland/just-web/tree/main/plugins/formatjs
[downloads-image]: https://img.shields.io/npm/dm/@just-web/formatjs.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-web/formatjs
[npm-image]: https://img.shields.io/npm/v/@just-web/formatjs.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-web/formatjs
