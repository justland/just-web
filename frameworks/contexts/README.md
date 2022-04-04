# @just-web/contexts

`@just-web/contexts` provides an API where components and plugins can interact with the application.

## Usage

## getReadonlyContext

`getReadonlyContext()` returns a `ReadonlyContext` after the application is started
(i.e. `createContext()` is called).

```tsx
import { getReadonlyContext } from '@just-app/contexts'

function work() {
  const context = getReadonlyContext()
}
```

Note that you cannot call `getReadonlyContext()` at load time.
The application needs to start before the context is available.

## Context

Plugin's `activate` function will receive a `context` from the application.

Plugin can use it to interact with the system.

```ts
import { Context } from '@just-web/contexts'

export function activate(context: Context) {
  // code away
}
```

