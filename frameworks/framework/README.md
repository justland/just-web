# @just-web/app

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

The entry point of `@just-web` application framework.

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

## Basic usage

Using a simple [React] app as an example:

```ts
import { createApp } from '@just-web/app'
import { AppContext } from '@just-web/react'
import ReactDOM from 'react-dom'
import App from './App'

void (async () => {
  const app = createApp().extend(...)
  await app.start()

  ReactDOM.render(
    <React.StrictMode>
      <AppContext.Provider value={app}>
        <App />
      </AppContext.Provider>
    <React.StrictMode>,
    document.getElementById('root')
  )
})
```

Your logics can be implemented as plugins.
The plugin can get the dependencies it needs through the `init()` function, or through `useAppContext()` for [React] components.

```ts
import { definePlugin } from '@just-web/types'

const plugin = definePlugin(() => {
  name: 'your-feature',
  init(ctx: ContextThatYouNeed) { ... }
})
```

```ts
import { useAppContext } from '@just-web/react'

const Comp = () => {
  const ctx = useAppContext<ContextThatYouNeed>()
  return <div>{ctx.auth.id}</div>
}
```

[React]: https://reactjs.org/
[downloads-image]: https://img.shields.io/npm/dm/@just-web/app.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-web/app
[npm-image]: https://img.shields.io/npm/v/@just-web/app.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-web/app
