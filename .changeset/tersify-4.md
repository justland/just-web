---
'@just-web/states': minor
'@just-web/commands': minor
---

Move the `tersify` runtime dependency from `^3.12.1` to `^4.0.3`.

Both packages use `tersify` only to render a handler into a debug/trace log message. No API changes, but this is a major bump of a dependency consumers resolve themselves, so it ships as a minor rather than a patch.
