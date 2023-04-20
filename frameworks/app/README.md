# @just-web/app

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[@just-web/app] provides the entry point for creating a [@just-web] application.

```ts
// app.ts
import { justApp } from '@just-web/app'

export async function yourApp() {
  // use the `with()` method to add features and functionalities to your app.
  return justApp({ name: 'your-app' }).with(...).create()
}

export type YourApp = ReturnType<typeof yourApp>
```

You can then use this app in any framework you like.

For example, in [React]:

```ts
// main.tsx
import { AppContext } from '@just-web/react'
import ReactDOM from 'react-dom'
import { yourApp } from './app'
import { AppComponent } from './app_component'

void (async () => {
  const app = await yourApp()
  ReactDOM.render(
    <React.StrictMode>
      <AppContext.Provider value={app}>
        <AppComponent />
      </AppContext.Provider>
    <React.StrictMode>,
    document.getElementById('root')
  )
})
```

Then, in any component:

```ts
import { useAppContext } from '@just-web/react'
import type { YourApp } from './app'

const MyComponent = () => {
  const app = useAppContext<YourApp>()

  return <div>{app.name}</div>
}
```

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

## Adding Features

All features are implemented as [gizmos][gizmo].

[gizmo] is an object that can be created asynchronously.
You can specify the dependencies it needs,
which `justApp()` will ensure the dependencies are added accordingly.

```ts
import { define } from '@just-web/app'

const gizmo = define({
  async create() {
    return {
      auth: {
        login(username, password) { /* ... */ },
        logout() { /* ... */ },
      }
    }
   }
})
```

There are other things you can do with a gizmo.
For more information, please check out the [gizmo] documentation.

[React]: https://reactjs.org/
[downloads-image]: https://img.shields.io/npm/dm/@just-web/app.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-web/app
[npm-image]: https://img.shields.io/npm/v/@just-web/app.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-web/app
[gizmo]: https://github.com/unional/async-fp/tree/main/packages/gizmo
[@just-web/app]: https://github.com/justland/just-web/tree/main/frameworks/app
[@just-web]: https://justland.github.io/just-web/
