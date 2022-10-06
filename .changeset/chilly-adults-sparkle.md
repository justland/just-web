---
"@just-web/log": patch
---

Remove `@just-web/log` init log message.
Now those messages are done at the app level,
so having them in the plugin level is not consistent.
Also, we don't want to extra log to appear when using `logTestPlugin()` during tests.

