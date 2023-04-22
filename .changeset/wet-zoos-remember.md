---
'@just-web/commands': patch
---

@just-web/commands should not pre-register "show command palette".

It should be registered by the app or components that actually provides the implementation.
