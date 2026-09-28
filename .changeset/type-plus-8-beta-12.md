---
'@just-web/app': patch
'@just-web/id': patch
'@just-web/log': patch
'@just-web/states': patch
'@just-web/browser': patch
'@just-web/browser-keyboard': patch
'@just-web/browser-preferences': patch
'@just-web/commands': patch
'@just-web/keyboard': patch
'@just-web/os': patch
'@just-web/routes': patch
---

Update `type-plus` to `8.0.0-beta.12` and align first-party dependencies

Dependencies move to `type-plus@8.0.0-beta.12`, `tersify@^4.0.8`,
`standard-log@^13.3.1` and `@unional/gizmo@^3.0.1`.

`@just-web/log` no longer depends on `type-plus`. It only used `Omit`, which
`type-plus` 8.0.0-beta.12 removed from its root exports; the built-in `Omit`
now covers it.

`@just-web/commands` computes `OverloadFallback` with `Assignable` instead of
`CanAssign`, which `type-plus` 8.0.0-beta.12 also removed. The resulting type
is unchanged.
