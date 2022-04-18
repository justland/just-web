# @just-web/react <!-- omit in toc -->

[`@just-web/react`] provides additional tools to use [`@just-web`] with [`React`].

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

## lazyImport

[`lazyImport`] imports a component module and get lazy load the component within.

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

[`useStore`] pick out a value in the `store` for `useState()`.

```tsx
import { createStore } from '@just-web/app'
import { useStore } from '@just-web/react'

const store = createStore({ counter: 0 })

const Component = () => {
  const [counter, setCounter] = useStore(store, s => s.counter)

  return <div>{counter}</div>
}
```

[`@just-web`]: https://github.com/justland/just-web
[`@just-web/react`]: https://github.com/justland/just-web/tree/main/frameworks/react
[`@just-web/states`]: https://github.com/justland/just-web/tree/main/frameworks/states
[`React`]: https://reactjs.org/
[`useStore`]: https://github.com/justland/just-web/blob/main/libraries/react/src/useStore.ts
[`lazyImport`]: https://github.com/justland/just-web/blob/main/libraries/react/src/lazyImport.ts
