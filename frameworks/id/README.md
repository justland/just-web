# @just-web/id

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

ID Gizmo provides a name and a randomized id to the gizmo.

This is part of the core [just-web] framework and you normally would use [@just-web/app] directly instead.

## Install

```sh
# npm
npm install @just-web/id

# yarn
yarn add @just-web/id

# pnpm
pnpm install @just-web/id

#rush
rush add -p @just-web/app
```

## Basic usage

```ts
import { incubate } from '@unional/gizmo'
import { idGizmo } from '@just-web/id'

void (async () => {
  const app = await incubate(idGizmo({ name: 'my-app' })).create()

  app.id // 'my-app'
})
```

[downloads-image]: https://img.shields.io/npm/dm/@just-web/id.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-web/id
[just-web]: https://github.com/justland/just-web
[npm-image]: https://img.shields.io/npm/v/@just-web/id.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-web/id
