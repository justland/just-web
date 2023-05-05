# @just-web/states

## 7.1.0

### Patch Changes

- 793a4747: Move `@repobuddy/typescript` from `dependencies` to `devDependencies`.
- 29c25aaa: Update `type-plus` 6.7.0

## 7.0.1

### Patch Changes

- 6403b822: Improve code quality with newer TypeScript settings (using `@repobuddy/typescript`)

## 7.0.0

### Major Changes

- a2ef64fb: Move `meta?` to `createState()`.

  There is no use case for adding different logger in each `set()` or `onChange()` call.

  Creation of default logger is now deferred.

- c2c26431: Drop `update()`.
  Update JSDocs.

### Minor Changes

- 977e1d30: Add `statesGizmo`.

  `createStore()` and `createRegistry()` both support optional `meta` parameter.

  `registry` now using plain object as base.
  The `record()` is nice but the log messages are polluted with `[Object: null prototype]`.
  The benefit is pretty minimal so it is removed.

## 7.0.0-beta.5

## 7.0.0-beta.4

## 7.0.0-beta.3

## 7.0.0-beta.2

## 7.0.0-beta.1

## 7.0.0-beta.0

### Major Changes

- a2ef64fb: Move `meta?` to `createState()`.

  There is no use case for adding different logger in each `set()` or `onChange()` call.

  Creation of default logger is now deferred.

- c2c26431: Drop `update()`.
  Update JSDocs.

### Minor Changes

- 977e1d30: Add `statesGizmo`.

  `createStore()` and `createRegistry()` both support optional `meta` parameter.

  `registry` now using plain object as base.
  The `record()` is nice but the log messages are polluted with `[Object: null prototype]`.
  The benefit is pretty minimal so it is removed.

## 6.0.2

### Patch Changes

- @just-web/log@6.0.2

## 6.0.1

### Patch Changes

- @just-web/log@6.0.1

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

## 5.0.4

### Patch Changes

- 8e9d5955: Fix `add()` param type when use with array store.
  - @just-web/log@5.0.4

## 5.0.3

### Patch Changes

- 11e57e0e: Use `@unional/immer` in-place of `immer`.

  The `github:unional/immer#master` does not work in some environment where getting code from GitHub is prohibited.
  Also, relying on `#master` is not a good idea to begin with.

- Updated dependencies [3a4f7414]
  - @just-web/log@5.0.3

## 5.0.2

### Patch Changes

- @just-web/log@5.0.2

## 5.0.1

### Patch Changes

- @just-web/log@5.0.1

## 5.0.0

### Minor Changes

- 12576b56: Add ESM support

### Patch Changes

- 0e94214c: Fix `store.set(fn)` under generics
- d3db351f: Update `type-plus`
- Updated dependencies [d3db351f]
- Updated dependencies [12576b56]
  - @just-web/log@5.0.0

## 5.0.0-beta.0

### Minor Changes

- 12576b56: Add ESM support

### Patch Changes

- 0e94214c: Fix `store.set(fn)` under generics
- d3db351f: Update `type-plus`
- Updated dependencies [d3db351f]
- Updated dependencies [12576b56]
  - @just-web/log@5.0.0-beta.0

## 4.1.0

### Patch Changes

- @just-web/log@4.1.0

## 4.0.2

### Patch Changes

- @just-web/log@4.0.2

## 4.0.1

### Patch Changes

- @just-web/log@4.0.1

## 4.0.0

### Major Changes

- 1e92661d: Enhance `set` support.

  It now works closer to `immer`:

  - Supports update and async update function when the init value is not a function.
  - Supports usage of `nothing` from `immer`.

  It will also return the updated result for convenience.
  While this does not follow Command Query Separation,
  it is easier to use and the name `set()` is clear that it updates the value.

  Deprecate `store.update()` and `registry.update()`.
  The `set()` function should cover all use cases.

  This is a `major` change because the type changes is breaking,
  even it just "add" functionality.

### Patch Changes

- 1e92661d: Update `type-plus` to `4.15.2`.
- e9e5e2f0: Fix `adder()` support of `Store<Record<any,any>>`
- 9b004db7: Update `type-plus` to use `MaybePromise.transform()`
- Updated dependencies [1e92661d]
- Updated dependencies [9b004db7]
  - @just-web/log@4.0.0

## 3.1.1

### Patch Changes

- @just-web/log@3.1.1

## 3.1.0

### Patch Changes

- Updated dependencies [085a2d1e]
  - @just-web/log@3.1.0

## 3.0.0

### Minor Changes

- f2f1a69: Add `has()` to registry.

### Patch Changes

- 7180f82: Update `type-plus` to 4.13.2.
- 0ff86d0: Fix `withAdder()` type when working with `Registry`.
- 0c21f10: Update deps from `workspace:^*` to `workspace:^`.

  `workspace:^*` is incorrect as during publish, the version is not replaced.

- Updated dependencies [7180f82]
- Updated dependencies [0c21f10]
  - @just-web/log@3.0.0

## 2.0.1

### Patch Changes

- @just-web/log@2.0.1

## 2.0.0

### Patch Changes

- Updated dependencies [89f4a41]
- Updated dependencies [cdd4f6b]
  - @just-web/log@2.0.0

## 1.1.1

### Patch Changes

- @just-web/log@1.1.1

## 1.1.0

### Patch Changes

- @just-web/log@1.1.0

## 1.0.2

### Patch Changes

- @just-web/log@1.0.2

## 1.0.1

### Patch Changes

- @just-web/log@1.0.1

## 1.0.0

### Patch Changes

- 564addf: Upgrade type-plus to 4.13.1

  Update `init()` and `start()` logs.

  Code comments are not kept so it that JSDocs will be available

- Updated dependencies [564addf]
- Updated dependencies [c228a89]
  - @just-web/log@1.0.0

## 0.2.3

### Patch Changes

- 4215e3c: fix(states): revert unfreeze

  `immer` is freezing value by default and that is desirable.

  So by not freezing the value within `just-web` would create inconsistency

## 0.2.2

### Patch Changes

- 862b5a8: do not freeze input values
- Updated dependencies [c99cfc2]
  - @just-web/log@0.2.2

## 0.2.1

### Patch Changes

- e8671c1: Rename `logContext` to `log` to match other props in the application.

  Update deps to fix bundling.
  `play-react` is not working again.

- Updated dependencies [e8671c1]
  - @just-web/log@0.2.1

## 0.2.0

### Minor Changes

- b056a08: Add micro-app support

### Patch Changes

- Updated dependencies [b056a08]
  - @just-web/log@0.2.0

## 0.1.1

### Patch Changes

- f2a3e89: Upgrade `iso-error` and `type-plus`.
  Downgrade package to ES2019 to better support webpack4 and older storybook environment.
- Updated dependencies [f2a3e89]
  - @just-web/log@0.1.1
