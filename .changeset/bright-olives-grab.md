---
'@just-web/preferences': minor
---

Internalize `preferencesGizmo` inside `memoryPreferencesGizmo`.
Fix it to take optional `KeyboardGizmo`.

Remove extra `connect()` call in `preferencesGizmo`.
The implementation needs to call `connect()` anyway.


Update docs.
