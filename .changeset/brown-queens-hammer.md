---
"@just-web/commands": patch
---

`@just-web/commands`: move types to fix a circular ref issue.

There are two `Command` types.
One is renamed to `CommandHandler` because that's what it is.
Should not be used directly anyway, so it is not a breaking change.
