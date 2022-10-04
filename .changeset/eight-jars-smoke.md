---
"@just-web/app": patch
---

Move `@just-web/log` and `@just-web/types` to peer dependencies.
The application will need to reference them directly when creating local plugins and modules.
Thus, the application need to import and add them as dependencies.
