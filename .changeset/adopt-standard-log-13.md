---
"@just-web/log": minor
"@just-web/app": minor
"@just-web/id": minor
"@just-web/browser": minor
"@just-web/browser-keyboard": minor
"@just-web/browser-preferences": minor
"@just-web/commands": patch
"@just-web/keyboard": patch
---

Adopt `standard-log@13`, removing a stale transitive `type-plus@5.6.0` and `tersify@3.12.1` from consumers' trees.

`standard-log@13.2.0` widens its `@just-func/types` dependency from `^0.5.0` to `^0.6.0` so it resolves `type-plus@8.0.0-beta.10` instead of a caret-locked `type-plus@5.6.0`. `standard-log`'s own public API is unchanged across this jump. `@just-web/browser` and `@just-web/commands` only carry `standard-log` as a devDependency, so this is a `patch` for `@just-web/commands` (fixed-versioned with `@just-web/keyboard`).
