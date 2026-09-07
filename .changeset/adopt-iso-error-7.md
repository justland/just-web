---
"@just-web/app": minor
"@just-web/id": minor
"@just-web/log": minor
"@just-web/browser": minor
"@just-web/browser-keyboard": minor
"@just-web/browser-preferences": minor
---

Adopt `iso-error@7`, removing a stale major from the dependency tree.

`iso-error@7`'s major is the Node engine floor moving to `>= 20` (pulled in transitively via `type-plus@8`); its public types (`ModuleError` and the errors re-exported from `@just-web/app`) are unchanged.
