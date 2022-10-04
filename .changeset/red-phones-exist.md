---
"@just-web/preferences": major
"@just-web/browser-preferences": major
---

Add `@just-web/preferences` and `@just-web/browser-preferences` for managing user preference.

`@just-web/browser-preferences` use `localStorage` for the job.
Meaning the preference will be preserved through tabs and sessions.

The key are prefixed with app name so that it works correctly in micro app/micro frontend scenarios.
The same for `clearAll()`. It only clears those belong to the application.
