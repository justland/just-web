# @just-web/states

State management for `@just-web/app` applications.

`@just-web/states` expect the value is immutable.

It uses [`Object.is()`](https://www.jstips.co/en/javascript/why-you-should-use-Object.is()-in-equality-comparison/) (similar to strict comparison `===`) to detect changes.

You can use a library such as [`immer`](https://github.com/immerjs/immer) to manage immutability.

You typically use this library through `@just-web/app`:

```ts
import app from '@just-web/app'

const [value, setValue, onChange] = app.states.createState(...)
const store = app.states.createStore(...)
```
