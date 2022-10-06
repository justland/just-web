# @just-web/routes

[@just-web/routes] is a plugin that provides client side routing capability.

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
