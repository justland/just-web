# Application context

`Context` contains functionality of the application accessible to the plugins.

Currently, there are two kinds of contexts: `Context` and `ReadonlyContext`.

In the future, `Context` will be more fine-grain and provide only the functionalities required by a particular plugin.
Each plugin will indicate what functionalities it needs and the application assess that information.

## accessing context

The (requested) context will be given to the plugin through the `activate` function:

```ts
// index.ts
import type { Context } '@just-web/contexts'

export function activate(context: Context) {
  // ..snip..
}
```

The `activate` function will be called when the plugin is loaded.

The plugin can save the context locally and access it from its logics and components.

## Testing with context

To test the plugin logics or components which uses the context,
there are several ways to do it.

- dependency injection
- seam injection
- module mock

## design

Besides the way `just-web` expose the context to the plugins,
there are other ways to do that same thing.

In this section, we are going to take a look at these other approaches and understand the pros and cons of them.

Singleton context:

```tsx
import { getContext } from '@just-web/contexts'

const Component = () => {
  const ctx = getContext()
  return <div>{ctx.format.i18n('hello')}</div>
}
```

- 👍easy to reference
- 👎only single application instance
- 👎create context first and config later, the context need to be pushed to `just-web`

Pass-in:

```tsx
const Component = (props) => {
  const { ctx } = props
  return <div>{ctx.format.i18n('hello')}</div>
}
```

- 👍 multiple applications
- 👍 flexible
- 👍 plugin makes the decision
- 👎 cascade pass down
- 👎 must be unique prop (`justContext`?), or will be hard to use

Activate:

```tsx
let ctx
function activate(context) {
  ctx = context
}

const Component = (props) => {
  return <div>{ctx.format.i18n('hello')}</div>
}

// or
const Component = (props) => {
  return <div>{Component.ctx.format.i18n('hello')}</div>
}
Component.ctx = ctx
```

- 👍 `activate()` is needed anyway
- 👍 multiple applications
- 👍 no cascade pass down
- 👍 easy to use (no need to pass in context)
- 👍 plugin makes the decision
