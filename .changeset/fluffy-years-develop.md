---
"@just-web/log": minor
"@just-web/browser": minor
"@just-web/types": patch
"@just-web/preferences": patch
---

`@just-web/log`: remove init log message.
It does not match with new plugin init logs and is expected to be working.
This also simplify testing as one less log entry to filter.

`@just-web/log`: add support of `getNonConsoleLog()`, for `@just-web/browser`.

`@just-web/log`: fix log ID prefixing

`@just-web/browser`: logs captured error to `non-console` logger.
