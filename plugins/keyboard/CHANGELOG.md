# @just-web/keyboard

## 5.0.0

### Minor Changes

- 12576b56: Add ESM support

### Patch Changes

- d3db351f: Update `type-plus`
- 74329e86: Remove usage of `StartContext`.
  `@just-web/presets-browser`: Export additional types.
- Updated dependencies [0e94214c]
- Updated dependencies [d3db351f]
- Updated dependencies [12576b56]
- Updated dependencies [74329e86]
  - @just-web/states@5.0.0
  - @just-web/log@5.0.0
  - @just-web/types@5.0.0
  - @just-web/os@5.0.0

## 5.0.0-beta.0

### Minor Changes

- 12576b56: Add ESM support

### Patch Changes

- d3db351f: Update `type-plus`
- 74329e86: Remove usage of `StartContext`.
  `@just-web/presets-browser`: Export additional types.
- Updated dependencies [0e94214c]
- Updated dependencies [d3db351f]
- Updated dependencies [12576b56]
- Updated dependencies [74329e86]
  - @just-web/states@5.0.0-beta.0
  - @just-web/log@5.0.0-beta.0
  - @just-web/types@5.0.0-beta.0
  - @just-web/os@5.0.0-beta.0

## 4.1.0

### Patch Changes

- Updated dependencies [3d4a51e3]
  - @just-web/types@4.1.0
  - @just-web/log@4.1.0
  - @just-web/os@4.1.0
  - @just-web/states@4.1.0

## 4.0.2

### Patch Changes

- @just-web/log@4.0.2
- @just-web/os@4.0.2
- @just-web/states@4.0.2
- @just-web/types@4.0.2

## 4.0.1

### Patch Changes

- @just-web/log@4.0.1
- @just-web/os@4.0.1
- @just-web/states@4.0.1
- @just-web/types@4.0.1

## 4.0.0

### Patch Changes

- 1e92661d: Update `type-plus` to `4.15.2`.
- 9b004db7: Update `type-plus` to use `MaybePromise.transform()`
- Updated dependencies [1e92661d]
- Updated dependencies [1e92661d]
- Updated dependencies [5729f2c0]
- Updated dependencies [e9e5e2f0]
- Updated dependencies [9b004db7]
  - @just-web/log@4.0.0
  - @just-web/types@4.0.0
  - @just-web/states@4.0.0
  - @just-web/os@4.0.0

## 3.1.1

### Patch Changes

- @just-web/log@3.1.1
- @just-web/os@3.1.1
- @just-web/states@3.1.1
- @just-web/types@3.1.1

## 3.1.0

### Patch Changes

- Updated dependencies [3be5a2a2]
- Updated dependencies [ca54af50]
- Updated dependencies [085a2d1e]
  - @just-web/types@3.1.0
  - @just-web/log@3.1.0
  - @just-web/os@3.1.0
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
  - @just-web/os@3.0.0

## 2.0.1

### Patch Changes

- @just-web/log@2.0.1
- @just-web/os@2.0.1
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

### Patch Changes

- Updated dependencies [89f4a41]
- Updated dependencies [cdd4f6b]
- Updated dependencies [8d9a1b9]
  - @just-web/log@2.0.0
  - @just-web/types@2.0.0
  - @just-web/states@2.0.0
  - @just-web/os@2.0.0
