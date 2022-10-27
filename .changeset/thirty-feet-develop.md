---
"@just-web/commands": patch
---

Make `KeyboardContext` optional.

This allows the command to be used in an application that does not need key binding support,
even if the command has key bindings.
