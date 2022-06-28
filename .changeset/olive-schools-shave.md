---
"@just-web/app": patch
---

Fix plugin module becomes frozen issue.

The plugin module was added to an unused `Store`,
which as a store value, it becomes deeply frozen.
