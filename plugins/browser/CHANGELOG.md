# @just-web/browser

## 3.1.1

### Patch Changes

- @just-web/log@3.1.1
- @just-web/states@3.1.1
- @just-web/types@3.1.1

## 3.1.0

### Patch Changes

- Updated dependencies [3be5a2a2]
- Updated dependencies [ca54af50]
- Updated dependencies [085a2d1e]
  - @just-web/types@3.1.0
  - @just-web/log@3.1.0
  - @just-web/states@3.1.0

## 3.0.0

### Patch Changes

- 7180f82: Update `type-plus` to 4.13.2.
- 0c21f10: Update deps from `workspace:^*` to `workspace:^`.

  `workspace:^*` is incorrect as during publish, the version is not replaced.

- Updated dependencies [7180f82]
- Updated dependencies [f2f1a69]
- Updated dependencies [0ff86d0]
- Updated dependencies [0c21f10]
  - @just-web/log@3.0.0
  - @just-web/types@3.0.0
  - @just-web/states@3.0.0

## 2.0.1

### Patch Changes

- @just-web/log@2.0.1
- @just-web/states@2.0.1
- @just-web/types@2.0.1

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

### Minor Changes

- cdd4f6b: `@just-web/log`: remove init log message.
  It does not match with new plugin init logs and is expected to be working.
  This also simplify testing as one less log entry to filter.

  `@just-web/log`: add support of `getNonConsoleLog()`, for `@just-web/browser`.

  `@just-web/log`: fix log ID prefixing

  `@just-web/browser`: logs captured error to `non-console` logger.

### Patch Changes

- Updated dependencies [89f4a41]
- Updated dependencies [cdd4f6b]
- Updated dependencies [8d9a1b9]
  - @just-web/log@2.0.0
  - @just-web/types@2.0.0
  - @just-web/states@2.0.0

## 1.1.1

### Patch Changes

- @just-web/log@1.1.1
- @just-web/states@1.1.1
- @just-web/types@1.1.1

## 1.1.0

### Patch Changes

- @just-web/log@1.1.0
- @just-web/states@1.1.0
- @just-web/types@1.1.0

## 1.0.2

### Patch Changes

- @just-web/log@1.0.2
- @just-web/states@1.0.2
- @just-web/types@1.0.2

## 1.0.1

### Patch Changes

- 640a299: export some missing types
  - @just-web/log@1.0.1
  - @just-web/states@1.0.1
  - @just-web/types@1.0.1

## 1.0.0

### Patch Changes

- cad72d1: Upgrade `iso-error` to 4.3.8
- Updated dependencies [564addf]
- Updated dependencies [c228a89]
- Updated dependencies [8c3183e]
  - @just-web/log@1.0.0
  - @just-web/states@1.0.0
  - @just-web/types@1.0.0
