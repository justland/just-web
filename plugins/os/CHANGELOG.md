# @just-web/os

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
  - @just-web/log@6.0.0
  - @just-web/types@6.0.0

## 5.0.4

### Patch Changes

- @just-web/log@5.0.4
- @just-web/types@5.0.4

## 5.0.3

### Patch Changes

- Updated dependencies [3a4f7414]
  - @just-web/log@5.0.3
  - @just-web/types@5.0.3

## 5.0.2

### Patch Changes

- fix main/module field
  - @just-web/log@5.0.2
  - @just-web/types@5.0.2

## 5.0.1

### Patch Changes

- @just-web/log@5.0.1
- @just-web/types@5.0.1

## 5.0.0

### Minor Changes

- 12576b56: Add ESM support

### Patch Changes

- d3db351f: Update `type-plus`
- 74329e86: Remove usage of `StartContext`.
  `@just-web/presets-browser`: Export additional types.
- Updated dependencies [d3db351f]
- Updated dependencies [12576b56]
  - @just-web/log@5.0.0
  - @just-web/types@5.0.0

## 5.0.0-beta.0

### Minor Changes

- 12576b56: Add ESM support

### Patch Changes

- d3db351f: Update `type-plus`
- 74329e86: Remove usage of `StartContext`.
  `@just-web/presets-browser`: Export additional types.
- Updated dependencies [d3db351f]
- Updated dependencies [12576b56]
  - @just-web/log@5.0.0-beta.0
  - @just-web/types@5.0.0-beta.0

## 4.1.0

### Patch Changes

- Updated dependencies [3d4a51e3]
  - @just-web/types@4.1.0
  - @just-web/log@4.1.0

## 4.0.2

### Patch Changes

- @just-web/log@4.0.2
- @just-web/types@4.0.2

## 4.0.1

### Patch Changes

- @just-web/log@4.0.1
- @just-web/types@4.0.1

## 4.0.0

### Patch Changes

- 1e92661d: Update `type-plus` to `4.15.2`.
- 9b004db7: Update `type-plus` to use `MaybePromise.transform()`
- Updated dependencies [1e92661d]
- Updated dependencies [5729f2c0]
- Updated dependencies [9b004db7]
  - @just-web/log@4.0.0
  - @just-web/types@4.0.0

## 3.1.1

### Patch Changes

- @just-web/log@3.1.1
- @just-web/types@3.1.1

## 3.1.0

### Patch Changes

- Updated dependencies [3be5a2a2]
- Updated dependencies [ca54af50]
- Updated dependencies [085a2d1e]
  - @just-web/types@3.1.0
  - @just-web/log@3.1.0

## 3.0.0

### Patch Changes

- 7180f82: Update `type-plus` to 4.13.2.
- 0c21f10: Update deps from `workspace:^*` to `workspace:^`.

  `workspace:^*` is incorrect as during publish, the version is not replaced.

- Updated dependencies [7180f82]
- Updated dependencies [0c21f10]
  - @just-web/log@3.0.0
  - @just-web/types@3.0.0

## 2.0.1

### Patch Changes

- @just-web/log@2.0.1
- @just-web/types@2.0.1

## 2.0.0

### Patch Changes

- Updated dependencies [89f4a41]
- Updated dependencies [cdd4f6b]
- Updated dependencies [8d9a1b9]
  - @just-web/log@2.0.0
  - @just-web/types@2.0.0

## 1.1.1

### Patch Changes

- @just-web/log@1.1.1
- @just-web/types@1.1.1

## 1.1.0

### Patch Changes

- @just-web/log@1.1.0
- @just-web/types@1.1.0

## 1.0.2

### Patch Changes

- @just-web/log@1.0.2
- @just-web/types@1.0.2

## 1.0.1

### Patch Changes

- @just-web/log@1.0.1
- @just-web/types@1.0.1

## 1.0.0

### Major Changes

- 8c3183e: Add `@just-web/os` for OS specific capabilities.

  It is extracted from `@just-web/platform` (removed).

  Note that it is a plugin and add the feature to the app itself,
  along with exposing the functionalities as named exports.

  This is because the having and use them through app allows mocks to be injected deep in the system,
  very useful when rendering OS dependent UI in storybook.

### Patch Changes

- Updated dependencies [564addf]
- Updated dependencies [c228a89]
- Updated dependencies [8c3183e]
  - @just-web/log@1.0.0
  - @just-web/types@1.0.0
