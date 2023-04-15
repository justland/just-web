---
'@just-web/states': minor
---

Add `statesGizmo`.

`createStore()` and `createRegistry()` both support optional `meta` parameter.

`registry` now using plain object as base.
The `record()` is nice but the log messages are polluted with `[Object: null prototype]`.
The benefit is pretty minimal so it is removed.

