# @just-web/log

## 3.0.0

### Patch Changes

- 7180f82: Update `type-plus` to 4.13.2.
- 0c21f10: Update deps from `workspace:^*` to `workspace:^`.

  `workspace:^*` is incorrect as during publish, the version is not replaced.

- Updated dependencies [7180f82]
- Updated dependencies [0c21f10]
  - @just-web/types@3.0.0

## 2.0.1

### Patch Changes

- @just-web/types@2.0.1

## 2.0.0

### Minor Changes

- cdd4f6b: `@just-web/log`: remove init log message.
  It does not match with new plugin init logs and is expected to be working.
  This also simplify testing as one less log entry to filter.

  `@just-web/log`: add support of `getNonConsoleLog()`, for `@just-web/browser`.

  `@just-web/log`: fix log ID prefixing

  `@just-web/browser`: logs captured error to `non-console` logger.

### Patch Changes

- 89f4a41: Remove `@just-web/log` init log message.
  Now those messages are done at the app level,
  so having them in the plugin level is not consistent.
  Also, we don't want to extra log to appear when using `logTestPlugin()` during tests.
- Updated dependencies [cdd4f6b]
- Updated dependencies [8d9a1b9]
  - @just-web/types@2.0.0

## 1.1.1

### Patch Changes

- @just-web/types@1.1.1

## 1.1.0

### Patch Changes

- @just-web/types@1.1.0

## 1.0.2

### Patch Changes

- @just-web/types@1.0.2

## 1.0.1

### Patch Changes

- @just-web/types@1.0.1

## 1.0.0

### Patch Changes

- 564addf: Upgrade type-plus to 4.13.1

  Update `init()` and `start()` logs.

  Code comments are not kept so it that JSDocs will be available

- c228a89: Upgrade `standard-log` to 10.0.0
- Updated dependencies [8c3183e]
  - @just-web/types@1.0.0

## 0.2.2

### Patch Changes

- c99cfc2: add `justLog()`

## 0.2.1

### Patch Changes

- e8671c1: Rename `logContext` to `log` to match other props in the application.

  Update deps to fix bundling.
  `play-react` is not working again.

## 0.2.0

### Minor Changes

- b056a08: Add micro-app support

## 0.1.1

### Patch Changes

- f2a3e89: Upgrade `iso-error` and `type-plus`.
  Downgrade package to ES2019 to better support webpack4 and older storybook environment.
