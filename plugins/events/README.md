# @just-web/events

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[@just-web/events] provides event based pub/sub system to [@just-web] applications.

## Install

```sh
# npm
npm install @just-web/events

# yarn
yarn add @just-web/events

# pnpm
pnpm install @just-web/events

#rush
rush add -p @just-web/events
```

## Usage

```ts
import { createApp } from '@just-web/app'
import eventsPlugin from '@just-web/events'

const app = createApp({ name: 'your-awesom-app' })
  .extend(eventsPlugin)

await app.start()

app.events.emitter.emit(...)
```

[@just-web]: https://github.com/justland/just-web/
[@just-web/events]: https://github.com/justland/just-web/tree/main/plugins/events
[downloads-image]: https://img.shields.io/npm/dm/@just-web/events.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-web/events
[npm-image]: https://img.shields.io/npm/v/@just-web/events.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-web/events
