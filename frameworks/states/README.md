# @just-web/states <!-- omit in toc -->

[`@just-web/states`] provides state management to all `@just-web` applications.

This is a core module of `@just-web`.
You do not need to reference this module directly.

The features of this module are exposed through [`@just-web/app`] and [`@just-web/contexts`].

`@just-web` modules, as well as default plugins and components,
use this to manage their states.

All data stored in the states are immutable.

[`@just-web/states`] uses [`immer`] to manage immutability,
and use [`Object.is()`] to detect changes.

## Features <!-- omit in toc -->

- [createState](#createstate)
- [createStore](#createstore)
  - [toReadonlyStore](#toreadonlystore)
- [createRegistry](#createregistry)
  - [toReadonlyRegistry](#toreadonlyregistry)
- [adder](#adder)
- [withAdder](#withadder)

## createState

`createState()` provides a functional style state management,
similar to `useState()` in React Hooks.

It returns 4 values instead of 2 compares to `useState()`.

```ts
const [value, set, onChange, reset] = createState<T>(init)
```

- `T`: type of the data. Will be inferred from `init` if not specified.
- `init`: the initial value. It will be frozen after calling `createState()`.
- `value`: the frozen `init`.
- `set(newValue)`: the setter for new value
- `onChange(handler)`: listen to state changes.
- `reset()`: reset the state value back to `init`.

As described above, you should use some immutable library when setting the value.
Here is an example on how to do it using [`immer`]:

```ts
import { createStore } from '@just-web/states'
import { produce } from 'immer'

const [value, set] = createState({ a: 1 })

set(produce(value, draft => { draft.a = 2 }))
```

## createStore

`createStore()` is the object-oriented counterpart of `createState()`.

```ts
const store = createStore<T>(init)

store.get()
store.set(value)
store.update(handler)
store.onChange(handler)
store.reset()
```

The key difference between `createStore()` and `createState()` is that you can get the current value of the `store` at anytime using `store.get()`.
For `state`, you can only get the latest value through `onChange()`.

It also provides `store.update(handler)` to make updating the store easier to do.
It is using [`immer`] internally as in the example above.

### toReadonlyStore

Since you pass `store` around as an object,
You may want to pass the `store` to someone with read only access.

You can create a read only version of the `store` using `toReadonlyStore()`:

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
you can use `toReadonlyRegistry()` to create a read only version of the registry.

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

Using `set(newValue)` (or `update(handler)`) to add an entry can be a bit tedious.
Therefore, we provide a `adder()` function which you can use to generate a `add(...entries)` function to add entries to the `store` or `registry`.

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

## withAdder

`withAdder()` uses the `adder()` function above to add a `add()` to the `store` or `registry`:

```ts
const store = withAdder(createStore<number>([]), push)
store.add(1, 2, 3)

const registry = withAdder(
  createRegistry({ key: 'x', value: 1 }),
  (record, entry) => { record[entry.key] = entry }
)
registry.add({ key: 'y', value: 2 }, { key: 'z', value: 999 })
```

## To do <!-- omit in toc -->

- 🔍 should `register.keys()` returns an iterator instead of array?
- 🔍 should `register` adds `values()` that returns an iterator?

[`@just-web/app`]: https://github.com/justland/just-web/tree/main/frameworks/app
[`@just-web/contexts`]: https://github.com/justland/just-web/tree/main/frameworks/contexts
[`@just-web/states`]: https://github.com/justland/just-web/tree/main/frameworks/states
[`immer`]: https://github.com/immerjs/immer
[`Object.is()`]: https://www.jstips.co/en/javascript/why-you-should-use-Object.is()-in-equality-comparison/
