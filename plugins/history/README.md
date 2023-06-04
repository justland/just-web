# @just-web/history

[@just-web/history] provides [history] API for a [@just-web] applications.

## Install

```sh
# npm
npm install @just-web/history

# yarn
yarn add @just-web/history

# pnpm
pnpm install @just-web/history

#rush
rush add -p @just-web/history
```

## Usage

```ts
import { justApp } from '@just-web/app'
import { historyGizmoFn } from '@just-web/history'

const app = await justApp({ name: 'your-awesome-app' })
  .with(historyGizmoFn())
  .create()

app.history...
```

You can also provide a custom history instance:

```ts
import { justApp } from '@just-web/app'
import { historyGizmoFn } from '@just-web/history'
import { createMemoryHistory } from 'history'

const app = await justApp({ name: 'your-awesome-app' })
  .with(historyGizmoFn({ history:createMemoryHistory() }))
  .create()
```

[@just-web]: https://github.com/justland/just-web
[@just-web/history]: https://github.com/justland/just-web/tree/main/plugins/history
[history]: https://github.com/remix-run/history#readme
