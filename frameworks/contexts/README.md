# @just-web/contexts

`@just-web/contexts` provides an API where components and plugins can interact with the application.

## Usage

## getReadonlyContext

`getReadonlyContext()` returns a `ReadonlyContext` after the application is started
(i.e. `createContext()` is called).

```tsx
import { getReadonlyContext } from '@just-app/contexts'

const ErrorList = () => {
  const context = getReadonlyContext()

  const errors = context.errors.store.get()
  if (errors.length > 0) {
    return <ul>
      {errors.map(e => (<li>e.toString()</li>))}
    </ul>
  } else {
    return <span>no errors</span>
  }
}
export default ErrorList
```

Note that you cannot call `getReadonlyContext()` at load time.
The application needs to start before the context is available.

Even when using `ReadonlyContext`, you can still add errors to the system.

```ts
import { getReadonlyContext } from '@just-web/contexts'

function doSomething() {
  const ctx = getReadonlyContext()
  ctx.errors.store.add(new Error('something went wrong'))
}
```
