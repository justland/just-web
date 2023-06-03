# @just-web/os

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[@just-web/os] provides Operating System specific implementations for core features for a [@just-web] applications.

Architecturally, under the lens of [Clean Architecture],
[@just-web/os] provides the adaptors and external details related to operating systems.

## Install

```sh
# npm
npm install @just-web/os

# yarn
yarn add @just-web/os

# pnpm
pnpm install @just-web/os

#rush
rush add -p @just-web/os
```

## Usage

```ts
import { justApp } from '@just-web/app'
import { osGizmo } from '@just-web/os'

const app = await justApp({ name: 'your-awesome-app' })
  .with(osGizmo)
  .create()

app.os.isMac()
```

[@just-web]: https://github.com/justland/just-web
[@just-web/os]: https://github.com/justland/just-web/tree/main/plugins/os
[Clean Architecture]: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
[downloads-image]: https://img.shields.io/npm/dm/@just-web/os.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-web/os
[npm-image]: https://img.shields.io/npm/v/@just-web/os.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-web/os
