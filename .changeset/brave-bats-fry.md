---
'@just-web/states': major
---

Enhance `set` support.

It now works closer to `immer`:

- Supports update and async update function when the init value is not a function.
- Supports usage of `nothing` from `immer`.

It will also return the updated result for convenience.
While this does not follow Command Query Separation,
it is easier to use and the name `set()` is clear that it updates the value.

Deprecate `store.update()` and `registry.update()`.
The `set()` function should cover all use cases.

This is a `major` change because the type changes is breaking,
even it just "add" functionality.
