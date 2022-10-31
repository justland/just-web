# @just-web/preferences

## 4.0.0

### Major Changes

- 9e297eb6: Clean up API.

  `updateUserPreference` and `clearUserPreference` are removed.
  `clearUserPreferences` renamed to `clearAllUserPreferences`.

  This makes the API similar to `useState()` in `React`,
  which is a very common way to handle `get/set`.

  In `@just-web/states`,
  `set()` and `update()` are two operations because it supports any value, including function.
  So `set(handler)` is ambiguous if the value can be a function.

  It is not the case here as we are dealing with `string` only.

  So follow the same API as `useState()` makes it easier to use.

### Minor Changes

- 1e92661d: Update to use the types from `@just-web/states`
- 9b004db7: Add `createStore()`

### Patch Changes

- 1e92661d: Update `type-plus` to `4.15.2`.
- 9b004db7: Update `type-plus` to use `MaybePromise.transform()`
- Updated dependencies [1e92661d]
- Updated dependencies [1e92661d]
- Updated dependencies [0987acac]
- Updated dependencies [5729f2c0]
- Updated dependencies [e9e5e2f0]
- Updated dependencies [24558c6f]
- Updated dependencies [9b004db7]
  - @just-web/log@4.0.0
  - @just-web/types@4.0.0
  - @just-web/states@4.0.0
  - @just-web/commands@4.0.0
  - @just-web/keyboard@4.0.0

## 3.1.1

### Patch Changes

- 17d5574e: Add defaultValue support for `getUserPreference`
- edca7c12: Fix `app.preference.*` return types
- Updated dependencies [d93f524c]
- Updated dependencies [adebc089]
- Updated dependencies [cf41bf89]
  - @just-web/commands@3.1.1
  - @just-web/keyboard@3.1.1
  - @just-web/log@3.1.1
  - @just-web/types@3.1.1

## 3.1.0

### Patch Changes

- Updated dependencies [3be5a2a2]
- Updated dependencies [ca54af50]
- Updated dependencies [085a2d1e]
  - @just-web/types@3.1.0
  - @just-web/log@3.1.0
  - @just-web/commands@3.1.0
  - @just-web/keyboard@3.1.0

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
  - @just-web/keyboard@3.0.0

## 2.0.1

### Patch Changes

- @just-web/commands@2.0.1
- @just-web/keyboard@2.0.1
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

- cdd4f6b: `@just-web/log`: remove init log message.
  It does not match with new plugin init logs and is expected to be working.
  This also simplify testing as one less log entry to filter.

  `@just-web/log`: add support of `getNonConsoleLog()`, for `@just-web/browser`.

  `@just-web/log`: fix log ID prefixing

  `@just-web/browser`: logs captured error to `non-console` logger.

- Updated dependencies [89f4a41]
- Updated dependencies [cdd4f6b]
- Updated dependencies [8d9a1b9]
- Updated dependencies [a106645]
  - @just-web/log@2.0.0
  - @just-web/types@2.0.0
  - @just-web/commands@2.0.0
  - @just-web/keyboard@2.0.0

## 1.1.1

### Patch Changes

- export `PreferencesContext`
  - @just-web/commands@1.1.1
  - @just-web/contributions@1.1.1
  - @just-web/log@1.1.1
  - @just-web/types@1.1.1

## 1.1.0

### Minor Changes

- 3576dd3: Add `updateUserPreference()`.

  Add proper logs to the implementations.

### Patch Changes

- @just-web/commands@1.1.0
- @just-web/contributions@1.1.0
- @just-web/log@1.1.0
- @just-web/types@1.1.0

## 1.0.2

### Patch Changes

- Updated dependencies [14cb2de]
  - @just-web/contributions@1.0.2
  - @just-web/commands@1.0.2
  - @just-web/log@1.0.2
  - @just-web/types@1.0.2

## 1.0.1

### Patch Changes

- @just-web/commands@1.0.1
- @just-web/contributions@1.0.1
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
- Updated dependencies [564addf]
- Updated dependencies [c228a89]
- Updated dependencies [8c3183e]
  - @just-web/commands@1.0.0
  - @just-web/contributions@1.0.0
  - @just-web/log@1.0.0
  - @just-web/types@1.0.0
