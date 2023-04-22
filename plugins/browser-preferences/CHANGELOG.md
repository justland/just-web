# @just-web/browser-preferences

## 7.0.0-beta.3

### Patch Changes

- Updated dependencies [18455d27]
  - @just-web/app@7.0.0-beta.3
  - @just-web/log@7.0.0-beta.3
  - @just-web/states@7.0.0-beta.3
  - @just-web/commands@7.0.0-beta.3
  - @just-web/preferences@7.0.0-beta.3
  - @just-web/types@7.0.0-beta.3

## 7.0.0-beta.2

### Patch Changes

- Updated dependencies [78becd0d]
  - @just-web/app@7.0.0-beta.2
  - @just-web/states@7.0.0-beta.2
  - @just-web/commands@7.0.0-beta.2
  - @just-web/preferences@7.0.0-beta.2
  - @just-web/log@7.0.0-beta.2
  - @just-web/types@7.0.0-beta.2

## 7.0.0-beta.1

### Patch Changes

- Updated dependencies [ab9f056d]
  - @just-web/app@7.0.0-beta.1
  - @just-web/states@7.0.0-beta.1
  - @just-web/commands@7.0.0-beta.1
  - @just-web/preferences@7.0.0-beta.1
  - @just-web/log@7.0.0-beta.1
  - @just-web/types@7.0.0-beta.1

## 7.0.0-beta.0

### Patch Changes

- Updated dependencies [977e1d30]
- Updated dependencies [a2ef64fb]
- Updated dependencies [c2c26431]
- Updated dependencies [10489f4f]
- Updated dependencies [3c0c09c2]
  - @just-web/states@7.0.0-beta.0
  - @just-web/log@7.0.0-beta.0
  - @just-web/commands@7.0.0-beta.0
  - @just-web/preferences@7.0.0-beta.0
  - @just-web/app@7.0.0-beta.0
  - @just-web/types@7.0.0-beta.0

## 6.0.2

### Patch Changes

- a15cdc1a: Wrap `localStorage` in function to avoid load time failure.
  - @just-web/commands@6.0.2
  - @just-web/log@6.0.2
  - @just-web/preferences@6.0.2
  - @just-web/states@6.0.2
  - @just-web/types@6.0.2

## 6.0.1

### Patch Changes

- @just-web/commands@6.0.1
- @just-web/log@6.0.1
- @just-web/preferences@6.0.1
- @just-web/states@6.0.1
- @just-web/types@6.0.1

## 6.0.0

### Patch Changes

- 2122d01a: Update `type-plus`
- 43fadc75: Fix `exports` fields.
  `types` should go first,
  `default` should go last, and point to CJS code.

  Also added `main` and `module` to improve compatibility.

- Updated dependencies [2122d01a]
- Updated dependencies [f174e16f]
- Updated dependencies [43fadc75]
  - @just-web/log@6.0.0
  - @just-web/types@6.0.0
  - @just-web/states@6.0.0
  - @just-web/commands@6.0.0
  - @just-web/preferences@6.0.0

## 5.0.4

### Patch Changes

- Updated dependencies [8e9d5955]
  - @just-web/states@5.0.4
  - @just-web/commands@5.0.4
  - @just-web/preferences@5.0.4
  - @just-web/log@5.0.4
  - @just-web/types@5.0.4

## 5.0.3

### Patch Changes

- 11e57e0e: Use `@unional/immer` in-place of `immer`.

  The `github:unional/immer#master` does not work in some environment where getting code from GitHub is prohibited.
  Also, relying on `#master` is not a good idea to begin with.

- Updated dependencies [3a4f7414]
- Updated dependencies [11e57e0e]
  - @just-web/log@5.0.3
  - @just-web/types@5.0.3
  - @just-web/commands@5.0.3
  - @just-web/states@5.0.3
  - @just-web/preferences@5.0.3

## 5.0.2

### Patch Changes

- @just-web/commands@5.0.2
- @just-web/preferences@5.0.2
- @just-web/log@5.0.2
- @just-web/states@5.0.2
- @just-web/types@5.0.2

## 5.0.1

### Patch Changes

- 17e3bd65: adjust `import type` to reduce imports
- Updated dependencies [17e3bd65]
  - @just-web/commands@5.0.1
  - @just-web/preferences@5.0.1
  - @just-web/log@5.0.1
  - @just-web/states@5.0.1
  - @just-web/types@5.0.1

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
- Updated dependencies [d3db351f]
- Updated dependencies [74329e86]
  - @just-web/states@5.0.0
  - @just-web/log@5.0.0
  - @just-web/types@5.0.0
  - @just-web/commands@5.0.0
  - @just-web/preferences@5.0.0

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
- Updated dependencies [d3db351f]
- Updated dependencies [74329e86]
  - @just-web/states@5.0.0-beta.0
  - @just-web/log@5.0.0-beta.0
  - @just-web/types@5.0.0-beta.0
  - @just-web/commands@5.0.0-beta.0
  - @just-web/preferences@5.0.0-beta.0

## 4.1.0

### Patch Changes

- Updated dependencies [3d4a51e3]
  - @just-web/types@4.1.0
  - @just-web/log@4.1.0
  - @just-web/commands@4.1.0
  - @just-web/preferences@4.1.0
  - @just-web/states@4.1.0

## 4.0.2

### Patch Changes

- 54f12bec: `KeyboardContext` should be optional
  - @just-web/commands@4.0.2
  - @just-web/log@4.0.2
  - @just-web/preferences@4.0.2
  - @just-web/states@4.0.2
  - @just-web/types@4.0.2

## 4.0.1

### Patch Changes

- @just-web/preferences@4.0.1
- @just-web/commands@4.0.1
- @just-web/log@4.0.1
- @just-web/states@4.0.1
- @just-web/types@4.0.1

## 4.0.0

### Major Changes

- fa12d3a0: Update implementation for `just-web/preferences` 4.0

### Minor Changes

- 1e92661d: Update to use the types from `@just-web/states`

### Patch Changes

- 1e92661d: Update `type-plus` to `4.15.2`.
- 9b004db7: Update `type-plus` to use `MaybePromise.transform()`
- Updated dependencies [1e92661d]
- Updated dependencies [1e92661d]
- Updated dependencies [0987acac]
- Updated dependencies [9e297eb6]
- Updated dependencies [5729f2c0]
- Updated dependencies [e9e5e2f0]
- Updated dependencies [24558c6f]
- Updated dependencies [1e92661d]
- Updated dependencies [9b004db7]
- Updated dependencies [9b004db7]
  - @just-web/log@4.0.0
  - @just-web/types@4.0.0
  - @just-web/states@4.0.0
  - @just-web/commands@4.0.0
  - @just-web/preferences@4.0.0

## 3.1.1

### Patch Changes

- Updated dependencies [17d5574e]
- Updated dependencies [edca7c12]
- Updated dependencies [d93f524c]
- Updated dependencies [adebc089]
- Updated dependencies [cf41bf89]
  - @just-web/preferences@3.1.1
  - @just-web/commands@3.1.1
  - @just-web/log@3.1.1
  - @just-web/types@3.1.1

## 3.1.0

### Patch Changes

- 085a2d1e: `@just-web/log`: adjust `LogOptions` type.
  It does not affect the actual API and `@just-web/app`.

  `@just-web/browser-preferences`: adjusts the log levels one more time and update the tests.

- 5d2b412f: Lower some logs levels to trace.
- Updated dependencies [3be5a2a2]
- Updated dependencies [ca54af50]
- Updated dependencies [085a2d1e]
  - @just-web/types@3.1.0
  - @just-web/log@3.1.0
  - @just-web/commands@3.1.0
  - @just-web/preferences@3.1.0

## 3.0.0

### Patch Changes

- 7180f82: Update `type-plus` to 4.13.2.
- 0c21f10: Update deps from `workspace:^*` to `workspace:^`.

  `workspace:^*` is incorrect as during publish, the version is not replaced.

- Updated dependencies [edbca92]
- Updated dependencies [5eb37cd]
- Updated dependencies [7180f82]
- Updated dependencies [7180f82]
- Updated dependencies [7180f82]
- Updated dependencies [0c21f10]
  - @just-web/commands@3.0.0
  - @just-web/log@3.0.0
  - @just-web/types@3.0.0
  - @just-web/preferences@3.0.0

## 2.0.1

### Patch Changes

- @just-web/preferences@2.0.1
- @just-web/commands@2.0.1
- @just-web/log@2.0.1
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
- Updated dependencies [a106645]
  - @just-web/log@2.0.0
  - @just-web/types@2.0.0
  - @just-web/preferences@2.0.0
  - @just-web/commands@2.0.0

## 1.1.1

### Patch Changes

- Updated dependencies
  - @just-web/preferences@1.1.1
  - @just-web/commands@1.1.1
  - @just-web/log@1.1.1
  - @just-web/types@1.1.1

## 1.1.0

### Minor Changes

- 3576dd3: Add `updateUserPreference()`.

  Add proper logs to the implementations.

### Patch Changes

- Updated dependencies [3576dd3]
  - @just-web/preferences@1.1.0
  - @just-web/commands@1.1.0
  - @just-web/log@1.1.0
  - @just-web/types@1.1.0

## 1.0.2

### Patch Changes

- @just-web/commands@1.0.2
- @just-web/preferences@1.0.2
- @just-web/log@1.0.2
- @just-web/types@1.0.2

## 1.0.1

### Patch Changes

- @just-web/preferences@1.0.1
- @just-web/commands@1.0.1
- @just-web/log@1.0.1
- @just-web/types@1.0.1

## 1.0.0

### Major Changes

- 8c3183e: Add `@just-web/preferences` and `@just-web/browser-preferences` for managing user preference.

  `@just-web/browser-preferences` use `localStorage` for the job.
  Meaning the preference will be preserved through tabs and sessions.

  The key are prefixed with app name so that it works correctly in micro app/micro frontend scenarios.
  The same for `clearAll()`. It only clears those belong to the application.

### Patch Changes

- Updated dependencies [b262ab5]
- Updated dependencies [8c3183e]
- Updated dependencies [564addf]
- Updated dependencies [c228a89]
- Updated dependencies [8c3183e]
  - @just-web/commands@1.0.0
  - @just-web/preferences@1.0.0
  - @just-web/log@1.0.0
  - @just-web/types@1.0.0
