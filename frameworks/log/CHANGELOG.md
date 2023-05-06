# @just-web/log

## 7.1.3

### Patch Changes

- dc0291fa: Update `@unional/gizmo`
- Updated dependencies [dc0291fa]
  - @just-web/id@6.0.7

## 7.1.2

### Patch Changes

- e1f71278: Move `repobuddy` and `tslib` to devDependency
- d0fc1710: Export `DEFAULT_LOG_METHOD_NAMES`
- Updated dependencies [e1f71278]
  - @just-web/id@6.0.6

## 7.1.1

### Patch Changes

- 61477ae9: Update to use `@unional/gizmo` v2
- Updated dependencies [61477ae9]
  - @just-web/id@6.0.5

## 7.1.0

### Patch Changes

- 793a4747: Move `@repobuddy/typescript` from `dependencies` to `devDependencies`.
- 29c25aaa: Update `type-plus` 6.7.0
- Updated dependencies [793a4747]
- Updated dependencies [29c25aaa]
  - @just-web/id@6.0.4

## 7.0.1

### Patch Changes

- 6403b822: Improve code quality with newer TypeScript settings (using `@repobuddy/typescript`)
- Updated dependencies [6403b822]
  - @just-web/id@6.0.3

## 7.0.0

### Minor Changes

- 10489f4f: `getLogger()` can omit id.

### Patch Changes

- 18455d27: Add `emitLog` support during tests

## 7.0.0-beta.5

### Patch Changes

- @just-web/types@7.0.0-beta.5

## 7.0.0-beta.4

### Patch Changes

- @just-web/types@7.0.0-beta.4

## 7.0.0-beta.3

### Patch Changes

- 18455d27: Add `emitLog` support during tests
  - @just-web/types@7.0.0-beta.3

## 7.0.0-beta.2

### Patch Changes

- @just-web/types@7.0.0-beta.2

## 7.0.0-beta.1

### Patch Changes

- @just-web/types@7.0.0-beta.1

## 7.0.0-beta.0

### Minor Changes

- 10489f4f: `getLogger()` can omit id.

### Patch Changes

- @just-web/types@7.0.0-beta.0

## 6.0.2

### Patch Changes

- @just-web/types@6.0.2

## 6.0.1

### Patch Changes

- @just-web/types@6.0.1

## 6.0.0

### Major Changes

- f174e16f: Remove `StartContext` variants.

  The `StartContextBase` is renamed as `StartContext`.

  The return type of `init()` remains as `[PluginContext]`.

### Patch Changes

- 2122d01a: Update `type-plus`
- 43fadc75: Fix `exports` fields.
  `types` should go first,
  `default` should go last, and point to CJS code.

  Also added `main` and `module` to improve compatibility.

- Updated dependencies [2122d01a]
- Updated dependencies [f174e16f]
- Updated dependencies [43fadc75]
  - @just-web/types@6.0.0

## 5.0.4

### Patch Changes

- @just-web/types@5.0.4

## 5.0.3

### Patch Changes

- 3a4f7414: Update `standard-log`
- Updated dependencies [3a4f7414]
  - @just-web/types@5.0.3

## 5.0.2

### Patch Changes

- @just-web/types@5.0.2

## 5.0.1

### Patch Changes

- @just-web/types@5.0.1

## 5.0.0

### Minor Changes

- 12576b56: Add ESM support

### Patch Changes

- d3db351f: Update `type-plus`
- Updated dependencies [d3db351f]
- Updated dependencies [12576b56]
  - @just-web/types@5.0.0

## 5.0.0-beta.0

### Minor Changes

- 12576b56: Add ESM support

### Patch Changes

- d3db351f: Update `type-plus`
- Updated dependencies [d3db351f]
- Updated dependencies [12576b56]
  - @just-web/types@5.0.0-beta.0

## 4.1.0

### Patch Changes

- Updated dependencies [3d4a51e3]
  - @just-web/types@4.1.0

## 4.0.2

### Patch Changes

- @just-web/types@4.0.2

## 4.0.1

### Patch Changes

- @just-web/types@4.0.1

## 4.0.0

### Patch Changes

- 1e92661d: Update `type-plus` to `4.15.2`.
- 9b004db7: Update `type-plus` to use `MaybePromise.transform()`
- Updated dependencies [1e92661d]
- Updated dependencies [5729f2c0]
- Updated dependencies [9b004db7]
  - @just-web/types@4.0.0

## 3.1.1

### Patch Changes

- @just-web/types@3.1.1

## 3.1.0

### Patch Changes

- 085a2d1e: `@just-web/log`: adjust `LogOptions` type.
  It does not affect the actual API and `@just-web/app`.

  `@just-web/browser-preferences`: adjusts the log levels one more time and update the tests.

- Updated dependencies [3be5a2a2]
- Updated dependencies [ca54af50]
  - @just-web/types@3.1.0

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
