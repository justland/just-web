# @just-web/id

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[`IDGizmo`] is a gizmo that provides a name and a randomized id.

This is part of the core [just-web] framework .
Every [just-web] application uses [`IDGizmo`] to provide a name and id.

You normally would not use this package directly,
but instead use the [@just-web/app](../app/README.md) package.

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

const app = await incubate(idGizmo({ name: 'my-app' })).create()

app.name // 'my-app'
app.id   // '...some random id...'
```

[downloads-image]: https://img.shields.io/npm/dm/@just-web/id.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-web/id
[just-web]: https://github.com/justland/just-web
[npm-image]: https://img.shields.io/npm/v/@just-web/id.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-web/id
[`IDGizmo`]: ./ts/id_gizmo.ts
