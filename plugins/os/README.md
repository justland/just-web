# `@just-web/os`

[`@just-web/os`] provides Operating System specific implementations for core features for a `@just-web` applications.

Architecturally, under the lens of [Clean Architecture],
[`@just-web/os`] provides the adaptors and external details related to operating systems.

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
import { createApp } from '@just-web/app'
import osPlugin from '@just-web/os'

createApp({ name: 'your-awesome-app' }).extend(osPlugin())
```

[`@just-web/os`]: https://github.com/justland/just-web/tree/main/plugins/os
[Clean Architecture]: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
