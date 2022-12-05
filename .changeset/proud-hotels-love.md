---
'@just-web/states': patch
'@just-web/browser-preferences': patch
'@just-web/preferences': patch
---

Use `@unional/immer` in-place of `immer`.

The `github:unional/immer#master` does not work in some environment where getting code from GitHub is prohibited.
Also, relying on `#master` is not a good idea to begin with.
