# @just-web/browser

## 9.0.0

### Patch Changes

- Updated dependencies [c4fa0c9]
  - @just-web/fetch@2.0.0

## 8.5.1

### Patch Changes

- 4d16182: Update ESM module file extensions from `.js` to `.mjs` and type definitions from `.d.ts` to `.d.mts` to align with tsdown 0.17.0 build output format.
- Updated dependencies [4d16182]
  - @just-web/app@7.3.1
  - @just-web/fetch@1.1.1
  - @just-web/states@7.2.1

## 8.5.0

### Minor Changes

- cea9ef5: Build with `tsdown` to get around the TypeScript 5.2 issue with CJS builds.

### Patch Changes

- 9d9a39d: Bind function for `localStorage` stub.
- Updated dependencies [cea9ef5]
  - @just-web/states@7.2.0
  - @just-web/app@7.3.0
  - @just-web/fetch@1.1.0

## 8.4.2

### Patch Changes

- 3140c0d2: Fix test gizmo to use the same fetch from browser gizmo

## 8.4.1

### Patch Changes

- 62ba2d2e: Bind `fetch`
- Updated dependencies [62ba2d2e]
  - @just-web/fetch@1.0.2

## 8.4.0

### Minor Changes

- 0c29bbe9: Supports getting `fetch` from optional `FetchGizmo`.
  Supports using custom `fetch` from options.

## 8.3.2

### Patch Changes

- fe05170f: Re-export used types to fix inferred type cannot be named issues.

## 8.3.1

### Patch Changes

- ef288022: Update `typescript` to 5.1.3. This fix the gizmo function type issue.
- Updated dependencies [ef288022]
  - @just-web/states@7.1.6
  - @just-web/app@7.2.1
  - @just-web/fetch@1.0.1

## 8.3.0

### Minor Changes

- e3495e9e: Use `@just-web/fetch` with better type support

### Patch Changes

- Updated dependencies [8eeca3e0]
- Updated dependencies [8eeca3e0]
  - @just-web/app@7.2.0
  - @just-web/fetch@1.0.0
  - @just-web/states@7.1.5

## 8.2.1

### Patch Changes

- f08838bf: Export error_store types for testing exports.

  The `@just-web/browser/testing` is separated from `@just-web/browser`.
  TypeScript was reporting the "inferred type cannot be named" error.

## 8.2.0

### Minor Changes

- 1ef492ba: Add fetch

## 8.1.0

### Minor Changes

- 80722ebb: Add `throwBrowserError()` for testing
  Adjust to use inferface instead of type

## 8.0.3

## 8.0.2

### Patch Changes

- 086a298b: Fix addEventListener "Illegal Invocation"

## 8.0.1

## 8.0.0

### Minor Changes

- ec8df311: Add `stubLocalStorage()` and `stubSessionStorage()`.

### Patch Changes

- a4198e2a: Use `addEventListener` over `onerror`.
  Update some types to use `inferface` over `type` to improve performance.

## 7.2.1

### Patch Changes

- db021cdf: Update type-plus
- Updated dependencies [db021cdf]
  - @just-web/app@7.1.5
  - @just-web/states@7.1.5

## 7.2.0

### Minor Changes

- Add `navigator` and `location`

## 7.1.4

### Patch Changes

- 9bbc1096: Add `stubStorage()` for testing
- @just-web/app@7.1.4
- @just-web/states@7.1.4

## 7.1.3

### Patch Changes

- Updated dependencies [dc0291fa]
  - @just-web/app@7.1.3
  - @just-web/states@7.1.3

## 7.1.2

### Patch Changes

- e1f71278: Move `repobuddy` and `tslib` to devDependency
- Updated dependencies [e1f71278]
- Updated dependencies [d9b97f22]
  - @just-web/app@7.1.2
  - @just-web/states@7.1.2

## 7.1.1

### Patch Changes

- 61477ae9: Update to use `@unional/gizmo` v2
- Updated dependencies [61477ae9]
  - @just-web/app@7.1.1
  - @just-web/states@7.1.1

## 7.1.0

### Minor Changes

- 29c25aaa: Add `localStorage` and `sessionStorage`.
  Add `browserTestGizmoFn()` to `@just-web/browser/testing`.

### Patch Changes

- 793a4747: Move `@repobuddy/typescript` from `dependencies` to `devDependencies`.
- 29c25aaa: Update `type-plus` 6.7.0
- Updated dependencies [793a4747]
- Updated dependencies [29c25aaa]
- Updated dependencies [76b36bfa]
  - @just-web/app@7.1.0
  - @just-web/states@7.1.0

## 7.0.1

### Patch Changes

- 6403b822: Improve code quality with newer TypeScript settings (using `@repobuddy/typescript`)
- Updated dependencies [6403b822]
  - @just-web/app@7.0.1
  - @just-web/states@7.0.1

## 7.0.0

### Major Changes

- f9aaffe2: `registerOnErrorHandler` signature changed.

### Patch Changes

- Updated dependencies [ab9f056d]
- Updated dependencies [977e1d30]
- Updated dependencies [6684e0ef]
- Updated dependencies [78becd0d]
- Updated dependencies [a2ef64fb]
- Updated dependencies [c2c26431]
- Updated dependencies [736fa4b4]
- Updated dependencies [18455d27]
  - @just-web/app@7.0.0
  - @just-web/states@7.0.0

## 7.0.0-beta.5

### Patch Changes

- Updated dependencies [6684e0ef]
  - @just-web/app@7.0.0-beta.5
  - @just-web/states@7.0.0-beta.5
  - @just-web/log@7.0.0-beta.5
  - @just-web/types@7.0.0-beta.5

## 7.0.0-beta.4

### Patch Changes

- Updated dependencies [736fa4b4]
  - @just-web/app@7.0.0-beta.4
  - @just-web/states@7.0.0-beta.4
  - @just-web/log@7.0.0-beta.4
  - @just-web/types@7.0.0-beta.4

## 7.0.0-beta.3

### Patch Changes

- Updated dependencies [18455d27]
  - @just-web/app@7.0.0-beta.3
  - @just-web/log@7.0.0-beta.3
  - @just-web/states@7.0.0-beta.3
  - @just-web/types@7.0.0-beta.3

## 7.0.0-beta.2

### Patch Changes

- Updated dependencies [78becd0d]
  - @just-web/app@7.0.0-beta.2
  - @just-web/states@7.0.0-beta.2
  - @just-web/log@7.0.0-beta.2
  - @just-web/types@7.0.0-beta.2

## 7.0.0-beta.1

### Patch Changes

- Updated dependencies [ab9f056d]
  - @just-web/app@7.0.0-beta.1
  - @just-web/states@7.0.0-beta.1
  - @just-web/log@7.0.0-beta.1
  - @just-web/types@7.0.0-beta.1

## 7.0.0-beta.0

### Major Changes

- f9aaffe2: `registerOnErrorHandler` signature changed.

### Patch Changes

- Updated dependencies [977e1d30]
- Updated dependencies [a2ef64fb]
- Updated dependencies [c2c26431]
- Updated dependencies [10489f4f]
  - @just-web/states@7.0.0-beta.0
  - @just-web/log@7.0.0-beta.0
  - @just-web/app@7.0.0-beta.0
  - @just-web/types@7.0.0-beta.0

## 6.0.2

### Patch Changes

- 42eada47: Wrap `window` in function to avoid load time failure.
  - @just-web/log@6.0.2
  - @just-web/states@6.0.2
  - @just-web/types@6.0.2

## 6.0.1

### Patch Changes

- eb559fd0: remove extra export of `browserPlugin`
  - @just-web/log@6.0.1
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

## 5.0.4

### Patch Changes

- Updated dependencies [8e9d5955]
  - @just-web/states@5.0.4
  - @just-web/log@5.0.4
  - @just-web/types@5.0.4

## 5.0.3

### Patch Changes

- Updated dependencies [3a4f7414]
- Updated dependencies [11e57e0e]
  - @just-web/log@5.0.3
  - @just-web/types@5.0.3
  - @just-web/states@5.0.3

## 5.0.2

### Patch Changes

- @just-web/log@5.0.2
- @just-web/states@5.0.2
- @just-web/types@5.0.2

## 5.0.1

### Patch Changes

- 17e3bd65: adjust `import type` to reduce imports
  - @just-web/log@5.0.1
  - @just-web/states@5.0.1
  - @just-web/types@5.0.1

## 5.0.0

### Minor Changes

- 12576b56: Add ESM support

### Patch Changes

- d3db351f: Update `type-plus`
- Updated dependencies [0e94214c]
- Updated dependencies [d3db351f]
- Updated dependencies [12576b56]
  - @just-web/states@5.0.0
  - @just-web/log@5.0.0
  - @just-web/types@5.0.0

## 5.0.0-beta.0

### Minor Changes

- 12576b56: Add ESM support

### Patch Changes

- d3db351f: Update `type-plus`
- Updated dependencies [0e94214c]
- Updated dependencies [d3db351f]
- Updated dependencies [12576b56]
  - @just-web/states@5.0.0-beta.0
  - @just-web/log@5.0.0-beta.0
  - @just-web/types@5.0.0-beta.0

## 4.1.0

### Patch Changes

- Updated dependencies [3d4a51e3]
  - @just-web/types@4.1.0
  - @just-web/log@4.1.0
  - @just-web/states@4.1.0

## 4.0.2

### Patch Changes

- @just-web/log@4.0.2
- @just-web/states@4.0.2
- @just-web/types@4.0.2

## 4.0.1

### Patch Changes

- @just-web/log@4.0.1
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
