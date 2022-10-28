---
"@just-web/preferences": major
---

Clean up API.

`updateUserPreference` and `clearUserPreference` are removed.
`clearUserPreferences` renamed to `clearAllUserPreferences`.

This makes the API similar to `useState()` in `React`,
which is a very common way to handle `get/set`.

In `@just-web/states`,
`set()` and `update()` are two operations because it supports any value, including function.
So `set(handler)` is ambiguous if the value can be a function.

It is not the case here as we are dealing with `string` only.

So follow the same API as `useState()` makes it easier to use.
