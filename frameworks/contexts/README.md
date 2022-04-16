# @just-web/contexts

[`@just-web/contexts`] provides APIs for components and plugins to interact with the application.

## Install

```sh
# npm
npm install @just-web/contexts

# yarn
yarn add @just-web/contexts

# pnpm
pnpm install @just-web/contexts

#rush
rush add -p @just-web/contexts
```

## Basic usage

Here is an example on how [`@just-web/react-commands`] registers a command handler and updates its internal state:

```ts
import { Context } from '@just-web/contexts'
import { createStore } from './store'

export function activate(context: Context) {
  const store = createStore(context)
  context.commands.register(
    'just-web.showCommandPalette',
    () => store.update(s => { s.openCommandPalette = true })
  )
}

// ./store.ts
import { Context, Store } from '@just-web/contexts'

export interface State {
  // Including the context so that it can be accessed anywhere within the package.
  context: Context,
  openCommandPalette: boolean
}

let store: Store<State>

export function createStore(context: Context) {
  return store = context.states.createStore<State>({
    context,
    openCommandPalette: false
  })
}

export function getStore() {
  return store
}
```

[`@just-web/app`]: https://github.com/justland/just-web/tree/main/frameworks/app
[`@just-web/contexts`]: https://github.com/justland/just-web/tree/main/frameworks/contexts
[`@just-web/react-commands`]: https://github.com/justland/just-web/tree/main/components/react-commands
