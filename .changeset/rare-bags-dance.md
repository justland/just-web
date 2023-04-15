---
'@just-web/states': major
---

Move `meta?` to `createState()`.

There is no use case for adding different logger in each `set()` or `onChange()` call.

Creation of default logger is now deferred.
