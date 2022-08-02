---
"@just-web/states": patch
---

fix(states): revert unfreeze

`immer` is freezing value by default and that is desirable.

So by not freezing the value within `just-web` would create inconsistency
