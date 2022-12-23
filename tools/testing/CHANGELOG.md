# @just-web/testing

## 0.3.6

### Patch Changes

- @just-web/log@6.0.1

## 0.3.5

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

## 0.3.4

### Patch Changes

- @just-web/log@5.0.4

## 0.3.3

### Patch Changes

- Updated dependencies [3a4f7414]
  - @just-web/log@5.0.3

## 0.3.2

### Patch Changes

- @just-web/log@5.0.2

## 0.3.1

### Patch Changes

- @just-web/log@5.0.1

## 0.3.0

### Minor Changes

- 12576b56: Add ESM support

### Patch Changes

- d3db351f: Update `type-plus`
- Updated dependencies [d3db351f]
- Updated dependencies [12576b56]
  - @just-web/log@5.0.0

## 0.3.0-beta.0

### Minor Changes

- 12576b56: Add ESM support

### Patch Changes

- d3db351f: Update `type-plus`
- Updated dependencies [d3db351f]
- Updated dependencies [12576b56]
  - @just-web/log@5.0.0-beta.0

## 0.2.16

### Patch Changes

- @just-web/log@4.1.0

## 0.2.15

### Patch Changes

- @just-web/log@4.0.2

## 0.2.14

### Patch Changes

- @just-web/log@4.0.1

## 0.2.13

### Patch Changes

- 1e92661d: Update `type-plus` to `4.15.2`.
- 9b004db7: Update `type-plus` to use `MaybePromise.transform()`
- Updated dependencies [1e92661d]
- Updated dependencies [9b004db7]
  - @just-web/log@4.0.0

## 0.2.12

### Patch Changes

- @just-web/log@3.1.1

## 0.2.11

### Patch Changes

- Updated dependencies [085a2d1e]
  - @just-web/log@3.1.0

## 0.2.10

### Patch Changes

- 7180f82: Update `type-plus` to 4.13.2.
- 0c21f10: Update deps from `workspace:^*` to `workspace:^`.

  `workspace:^*` is incorrect as during publish, the version is not replaced.

- Updated dependencies [7180f82]
- Updated dependencies [0c21f10]
  - @just-web/log@3.0.0

## 0.2.9

### Patch Changes

- @just-web/log@2.0.1

## 0.2.8

### Patch Changes

- Updated dependencies [89f4a41]
- Updated dependencies [cdd4f6b]
  - @just-web/log@2.0.0

## 0.2.7

### Patch Changes

- @just-web/log@1.1.1

## 0.2.6

### Patch Changes

- @just-web/log@1.1.0

## 0.2.5

### Patch Changes

- @just-web/log@1.0.2

## 0.2.4

### Patch Changes

- @just-web/log@1.0.1

## 0.2.3

### Patch Changes

- 564addf: Upgrade type-plus to 4.13.1

  Update `init()` and `start()` logs.

  Code comments are not kept so it that JSDocs will be available

- 0e94b19: Upgrade `assertron` to 10.0.0
- Updated dependencies [564addf]
- Updated dependencies [c228a89]
  - @just-web/log@1.0.0

## 0.2.2

### Patch Changes

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
