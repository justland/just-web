# @just-web/browser-contributions

## 2.0.0

### Major Changes

- 8d9a1b9: Replace `@just-web/contributions` with `@just-web/keyboard` and `@just-web/commands`

  `contributions.keyBindings` -> `keyboard.keyBindingContributions`
  `contributions.commands` -> `commands.contributions`
  `commands.register()` -> `commands.handlers.register()`
  `commands.invoke()` -> `commands.handlers.invoke()`
  `commands.keys()` -> `commands.handlers.keys()`

  The contribution is a concept that should spread around plugins,
  where which plugin indicates they have contributions to declare.

  This makes the dependencies easier to manage.

  Fixing [#101](https://github.com/justland/just-web/issues/101)

### Patch Changes

- Updated dependencies [89f4a41]
- Updated dependencies [cdd4f6b]
- Updated dependencies [8d9a1b9]
- Updated dependencies [a106645]
  - @just-web/log@2.0.0
  - @just-web/types@2.0.0
  - @just-web/commands@2.0.0
  - @just-web/keyboard@2.0.0
  - @just-web/os@2.0.0

## 1.1.1

### Patch Changes

- @just-web/commands@1.1.1
- @just-web/contributions@1.1.1
- @just-web/log@1.1.1
- @just-web/os@1.1.1
- @just-web/types@1.1.1

## 1.1.0

### Patch Changes

- @just-web/commands@1.1.0
- @just-web/contributions@1.1.0
- @just-web/log@1.1.0
- @just-web/os@1.1.0
- @just-web/types@1.1.0

## 1.0.2

### Patch Changes

- Updated dependencies [14cb2de]
  - @just-web/contributions@1.0.2
  - @just-web/commands@1.0.2
  - @just-web/log@1.0.2
  - @just-web/os@1.0.2
  - @just-web/types@1.0.2

## 1.0.1

### Patch Changes

- @just-web/commands@1.0.1
- @just-web/contributions@1.0.1
- @just-web/log@1.0.1
- @just-web/os@1.0.1
- @just-web/types@1.0.1

## 1.0.0

### Patch Changes

- Updated dependencies [8c3183e]
- Updated dependencies [b262ab5]
- Updated dependencies [564addf]
- Updated dependencies [c228a89]
- Updated dependencies [8c3183e]
  - @just-web/os@1.0.0
  - @just-web/commands@1.0.0
  - @just-web/contributions@1.0.0
  - @just-web/log@1.0.0
  - @just-web/types@1.0.0
