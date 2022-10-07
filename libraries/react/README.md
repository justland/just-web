# @just-web/react <!-- omit in toc -->

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[@just-web/react] provides additional utilities when using [@just-web] with [React].

## Install <!-- omit in toc -->

```sh
# npm
npm install @just-web/react

# yarn
yarn add @just-web/react

# pnpm
pnpm install @just-web/react

#rush
rush add -p @just-web/react
```

## Features <!-- omit in toc -->

- [lazyImport](#lazyimport)
- [useStore](#usestore)
- [useStoreContext](#usestorecontext)

## lazyImport

[lazyImport()] imports a component module and get lazy load the component within.

```tsx
const app = createTestApp()

const MyComp = () => {
  const CommandPalette = lazyImport(
    () => app,
    () => import('@just-web/react-commands'),
    m => m.CommandPalette)

  return <Suspense fallback={<div>loading...</div>}>
    <CommandPalette />
  </Suspense>
}
```

## useStore

[useStore()] picks out a value in the `store` similar to `useState()`.

```tsx
import { createStore } from '@just-web/app'
import { useStore } from '@just-web/react'

const store = createStore({ counter: 0 })

const Component = () => {
  const [counter, setCounter] = useStore(
    store,
    // getState
    s => s.counter,
    // Optional: updateStore when state changes
    s=>{ s.counter = counter }
  )

  return <div>{counter}</div>
}
```

Note that `updateStore()` is optional.
If you want to keep the state internal to the component and update the store on demand,
you can use `useEffect()` to update the store yourself.

But most of the time, supplying `updateStore()` is sufficient.

## useStoreContext

[useStore()] is useful to consume an app-level store:

```tsx
// from another file
import { store } from './store'

// or create at the module scope
const store = createStore(...)

const Component = () => {
  const [] = useStore(store, ...)
}
```

It doesn't work well if we want to have a local store the live and die with the DOM.

In [React], that's when you can use `createContext()` and `useContext()`.

Here, we can use [createStoreContext()] and [useStoreContext()] to achieve the same thing with [Store].

And the usage is much simpler and efficient thanks to the underlying [immer] implementation.

```tsx
import { createStoreContext, useStoreContext } from '@just-web/react'
import { createStore } from '@just-web/states'

type YourStore = { counter: number }

const YourContext = createStoreContext<YourStore>() // no default value

const YourProvider = (props) => {
  const store = createStore<YourStore>({ counter: 0 })
  return <YourContext.Provider value={store} {...props}/>
}

const YourConsumer = () => {
  const [counter, setCounter] = useStoreContext(
    YourContext,
    s => s.counter,
    (s, v) => { s.counter = v }
  )

  return <>
    <div>counter: {counter}</div>
    <button onClick={() => setCounter(counter + 1)}>Increment</button>
  </>
}
```

[@just-web]: https://github.com/justland/just-web
[@just-web/react]: https://github.com/justland/just-web/tree/main/frameworks/react
[React]: https://reactjs.org/
[useStore()]: https://github.com/justland/just-web/blob/main/libraries/react/src/useStore.ts
[lazyImport()]: https://github.com/justland/just-web/blob/main/libraries/react/src/lazyImport.ts
[createStoreContext()]: https://github.com/justland/just-web/blob/main/libraries/react/src/useStoreContext.ts
[useStoreContext()]: https://github.com/justland/just-web/blob/main/libraries/react/src/useStoreContext.ts
[Store]: https://github.com/justland/just-web/tree/main/frameworks/states/ts/store.ts
[immer]: https://www.npmjs.com/package/immer
[downloads-image]: https://img.shields.io/npm/dm/@just-web/react.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-web/react
[npm-image]: https://img.shields.io/npm/v/@just-web/react.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-web/react
