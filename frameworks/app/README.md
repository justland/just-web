# @just-web/app

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[@just-web/app] is the entry point of the [just-web] framework.

## Install

```sh
# npm
npm install @just-web/app

# yarn
yarn add @just-web/app

# pnpm
pnpm install @just-web/app

#rush
rush add -p @just-web/app
```

## Overview

Each [just-web] app has two parts: features and host.

Every feature of a [just-web] app is implemented in a [gizmo].

[Gizmo] allows you to define and compose asynchronous features.

The host then compose these [gizmos][gizmo] into an app.

## Usage

[Gizmo] is defined using the `define()` function.

It is the same `define()` function provided by [@unional/gizmo][gizmo].
[@just-web/app] simply re-exports it.

Here is an example to create a [gizmo] of a music store:

```ts
import { define } from '@just-web/app'

export const musicStoreGizmo = define({
  async create() {
    return { musicStore: { loadSong(id) { /* ... */ } } }
  }
})

export type MusicStoreGizmo = define.Infer<typeof musticStoreGizmo>
```

Note that you can infer the type of the [gizmo] using `define.Infer<typeof gizmo>`.

Then, let's create a [gizmo] of [Miku]:

```ts
import { define } from '@just-web/app'
import type { MusicStoreGizmo } from './music_store_gizmo'

export const mikuGizmo = define({
  static: define.require<MusicStoreGizmo>(),
  async create({ musicStore }) {
    return { miku: { sing() { /* ... */ } } }
  }
})
```

By using `static: define.require<MusicStoreGizmo>()`,
you define that the `mikuGizmo` depends on the `MusicStoreGizmo`.

Since you only specify the type,
the `mikuGizmo` does not care about the implementation of the `MusicStoreGizmo`.

Any [gizmo] that implements the `MusicStoreGizmo` can be used.

There are other things you can do with [gizmo].
For more information, please check out the [gizmo] documentation.

---

Now, let's create an app that uses the `mikuGizmo`:

```ts
import { justApp, type JustApp } from '@just-web/app'
import { mikuGizmo, type MikuGizmo } from './miku_gizmo'
import { musicStoreGizmo, type MusicStoreGizmo } from './music_store_gizmo'

export const singAlongApp = justApp({ name: 'sing-along' })
  .with(musicStoreGizmo)
  .with(mikuGizmo)

export type SingAlongApp = JustApp & MikuGizmo & MusicStoreGizmo

const app = await singAlongApp.create()
app.miku.sing()
```

The `justApp()` creates an *app incubator*,
which can use the `with()` method to add features to the app,
then the `create()` method creates the actual app.

## With UI Framework

You can see the [just-web] focus on the app logic.
It does not care about the UI framework you use.

You can use any UI framework you like.

For example, check out the [React] example in [@just-web/react].

## Other features

The [just-web] framework provides other features that you can use in your app.

Refer to the [just-web] documentation for more information.

[@just-web/app]: https://github.com/justland/just-web/tree/main/frameworks/app
[@just-web/react]: https://github.com/justland/just-web-react/tree/main/libraries/react
[downloads-image]: https://img.shields.io/npm/dm/@just-web/app.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-web/app
[gizmo]: https://github.com/unional/async-fp/tree/main/packages/gizmo
[just-web]: https://justland.github.io/just-web/
[miku]: https://ec.crypton.co.jp/pages/prod/virtualsinger/cv01_us
[npm-image]: https://img.shields.io/npm/v/@just-web/app.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-web/app
[React]: https://reactjs.org/
