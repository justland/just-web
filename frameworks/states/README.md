# @just-web/states

State management for `@just-web/app` applications.

You normally will not reference this library directly.

Instead, access its API through `@just-web/app`:

```ts
import app from '@just-web/app'

app.states.enableES5()

// other configurations...

app.start()
```

`@just-web/states` internally use [`immer`](https://github.com/immerjs/immer) for immutability.

It exposes the feature methods from `immer`.
If your application has specific needs,
call the corresponding method to enable them.
