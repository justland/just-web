# @just-web/errors

Error capturing and reporting module.

It captures both user and system errors and make them available for the application.

This is a `@just-web` core module and should not be referenced directly.

You can access its functionality through `@just-web/app` and `@just-web/contexts`.

## Setup

```ts
import app from '@just-web/app`

// tbd
app.errors.start(options)

// or
app.start({ errors: errorOptions })
```

## Access through `@just-web/contexts`

For components and plugins, `errors` is available in both `Context` and `ReadonlyContext`

```ts
import { getReadonlyContext, Context, ReadonlyContext } from '@just-web/contexts'

function work() {
  const ctx = getReadonlyContext()
  ctx.errors.store.add(new Error('something went wrong'))
}

function activate(ctx: ReadonlyContext) {
  ctx.errors.store.add(new Error('something went wrong'))
}

// for plugins with write access
function activate(ctx: Context) {
  ctx.errors.store.add(new Error('something went wrong'))
}
```

Note that even in `ReadonlyContext`, you can still add errors to the system.

## Access through `@just-web/app`

`app` expose everything `contexts` exposes, so accessing `errors` is straightforward:

```ts
import app from '@jest-web/app'

app.errors.store.add(new Error('something went wrong'))
```

## ErrorStore

`ErrorStore` is a `Store<Error[]>` with an `add()` method.

## TODO

- 🏗️ add error reporting through `@just-web/logs`
