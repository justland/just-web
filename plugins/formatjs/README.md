# @just-web/formatjs

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[@just-web/formatjs] provides [Format.JS] support for [@just-web] applications.

It re-exports [@formatjs/intl] so that you can access all functionality of [@formatjs/intl] directly.

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

The `formatJSGizmoFn()` accepts the same parameters as `createIntl()` in object from:

```ts
import { justApp } from '@just-web/app'
import { formatJSGizmoFn, createIntlCache } from '@just-web/formatjs'

const cache = createIntlCache()

const app = await justApp({ name: 'your-awesome-app' })
  .with(formatJSGizmoFn({
    config: { locale: 'en', messages: {} },
    cache
  }))
  .create()

app.formatjs.intl.formatMessage({ defaultMessage: 'hello world' })
```

[@just-web]: https://github.com/justland/just-web
[@just-web/formatjs]: https://github.com/justland/just-web/tree/main/plugins/formatjs
[downloads-image]: https://img.shields.io/npm/dm/@just-web/formatjs.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-web/formatjs
[npm-image]: https://img.shields.io/npm/v/@just-web/formatjs.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-web/formatjs
[@formatjs/intl]: https://formatjs.io/docs/intl/
[Format.JS]: https://formatjs.io/
