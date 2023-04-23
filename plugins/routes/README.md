# @just-web/routes

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[@just-web/routes] is a plugin that provides client side routing capability.

NOTE: This plugin is still in development and is not ready for production use.

## Features

- routing
- history

## Install

```sh
# npm
npm install @just-web/routes

# yarn
yarn add @just-web/routes

# pnpm
pnpm install @just-web/routes

#rush
rush add -p @just-web/routes
```

## Basic usage

Since routing is a basic functionality of an application,
you typically will load it statically:

```ts
import { createApp } from '@just-web/app'
import routesPlugin from '@just-web/routes'

void (async () => {
  const app = await createApp({ name: 'my-awesome-app' })
    .extend(routesPlugin())

  app.routes.register('/', () => { ... })
  app.routes.register('/error', () => { ... })
  await app.start()
})()

```

[@just-web/routes]: https://github.com/justland/just-web/tree/main/plugins/routes
[downloads-image]: https://img.shields.io/npm/dm/@just-web/routes.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-web/routes
[npm-image]: https://img.shields.io/npm/v/@just-web/routes.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-web/routes
