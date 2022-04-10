# @just-web/states

State management module.

All modules in `@just-web` uses this module to store data,
providing a consistent and efficient implemention.

All data stored are immutable.

It uses [`Object.is()`](https://www.jstips.co/en/javascript/why-you-should-use-Object.is()-in-equality-comparison/) (similar to strict comparison `===`) to detect changes.

You can use a library such as [`immer`](https://github.com/immerjs/immer) to manage immutability.

This is a `@just-web` library, meaning you can access it directly.
It is also exposed through `just-web` and `@just-web/contexts` for convenience.

## How to access

Access it directly, through `just-web` or `@just-web/contexts`:

```ts
import { createStore } from '@just-web/states'
import app from 'just-web`
import { getReadonlyContext, Context } from '@just-web/contexts'

function work() {
  let store = createStore({})
  store = app.states.createStore({})
  getReadonlyContext().states.createStore({})
}

// through plugin activation
export function activate(context: Context) {
  const store = context.states.createStore({})
}
```

## Features

- [@just-web/states](#just-webstates)
  - [How to access](#how-to-access)
  - [Features](#features)
  - [createState](#createstate)
  - [createStore](#createstore)
    - [toReadonlyStore](#toreadonlystore)
  - [createRegistry](#createregistry)
    - [toReadonlyRegistry](#toreadonlyregistry)
  - [adder](#adder)
  - [TODO](#todo)

## createState

`createState()` provides a functional style state management,
similar to `useState()` in React Hooks.

It returns 4 values instead of 2 in `useState()`.

```ts
const [value, set, onChange, reset] = createState<T>(init)
```

- `T`: type of the data. Will be inferred from `init` if not specified.
- `init`: the initial value. It will be freezed after calling `createState()`.
- `value`: the freezed `init`.
- `set(newValue)`: the setter for new value
- `onChange(handler)`: listen to changes of the state.
- `reset()`: reset the store value back to `init`.

As described above, you should use some immutable library when setting the value.
Here is an example on how to do it using [`immer`](https://immerjs.github.io/immer/):

```ts
import { createStore } from '@just-web/states'
import { produce } from 'immer'

const [value,set] = createState({ a: 1 })

set(produce(value, orig => { orig.b = 2 }))
```

## createStore

`createStore()` is the object-oriented counterpart of `createState()`.

```ts
const store = createStore<T>(init)

store.get()
store.set(value)
store.onChange(handler)
store.reset()
```

The key difference between `createStore()` and `createState()` is that you can get the current value of the `store` at anytime using `store.get()`.
For `state`, you can only get the latest value through `onChange()`.

### toReadonlyStore

Since you pass `store` around as an object,
You may want to pass the `store` to someone with readonly access.

You can create a readonly version of the `store` using `toReadonlyStore()`:

```ts
const store = createStore({})
const readonlyStore = toReadonlyStore(store)

// readonly store only has
readonlyStore.get()
readonlyStore.onChange(handler)
```

## createRegistry

`createRegistry()` is a specialized version of `createStore()` that deals with `Record<K, T>`.

```ts
const registry = createRegistry({})

// on top of store's API, registry has
registry.keys()
registry.size()
registry.list()
```

- `keys()`: gets a list of keys in the registry.
- `size()`: gets how many entries in the registry.
- `list()`: gets a list of values in the registry.

### toReadonlyRegistry

Same as `store`,
you can use `toReadonlyRegistry()` to create a readonly version of the registry.

```ts
const registry = createRegistry({})
const readonlyRegistry = toReadonlyRegistry(registry)

// readonly registry only has
readonlyRegistry.get()
readonlyRegistry.onChange(handler)
readonlyRegistry.keys()
readonlyRegistry.size()
readonlyRegistry.list()
```

## adder

Using `set(newValue)` to add an entry can be a bit tedious.
Therefore we provide an `adder()` function which you can use to generate an `add(...entries)` function to add entries to the `store` or `registry`.

```ts
const store = createStore<number[]>([])
const addToStore = adder(store, (record, entry) => { record.push(entry) })
addToStore(1, 2, 3, 4)

const registry = createRegistry({})
const addToRegistry = adder(registry, (record, entry) => { record[entry.key] = entry })
addToRegistry({ key: 'a', value: 1 }, { key: 'b', value: 2 })
```

You can also use the provided `push` and `unshift` function for array:

```ts
const store = createStore<number[]>([])
const pushToStore = adder(store, push)
const unshiftToStore = adder(store, unshift)
```

## TODO

🔍 should `init` value be freezed?
🔍 should `register.keys()` returns an iterator instead of array?
🔍 should `register` adds `values()` that returns an iterator?
🔍 should `register.list()` renamed to `values()` and returns an iterator?
