# @just-web/react <!-- omit in toc -->

[`@just-web/react`] provides additional tools to use `@just-web` with [`React`].

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

- [useStore](#usestore)

## useStore

```tsx
import { createStore } from '@just-web/app'
import { useStore } from '@just-web/react'

const store = createStore({ counter: 0 })

const Component = () => {
  const [counter, setCounter] = useStore(store, s => s.counter)

  return <div>{counter}</div>
}
```

[`@just-web/react`]: https://github.com/justland/just-web/tree/main/frameworks/react
[`@just-web/states`]: https://github.com/justland/just-web/tree/main/frameworks/states
[React]: https://reactjs.org/
