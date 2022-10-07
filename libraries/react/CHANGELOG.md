# @just-web/react

## 2.1.1

### Patch Changes

- 372ab7e: `@just-web/app`: starts newly added plugin when calling `start()` again.
  `@just-web/react`: fix `lazyImport()` to start the plugin correctly.

  The signature of `lazyImport()` changed.
  But since this is so new, keep it as a patch.

- Updated dependencies [3905f21]
- Updated dependencies [372ab7e]
  - @just-web/app@2.0.1
  - @just-web/log@2.0.1
  - @just-web/states@2.0.1
  - @just-web/types@2.0.1

## 2.1.0

### Minor Changes

- 4b05ca8: Add `createStoreContext()` and `useStoreContext()`

### Patch Changes

- Updated dependencies [89f4a41]
- Updated dependencies [cdd4f6b]
- Updated dependencies [8d9a1b9]
  - @just-web/log@2.0.0
  - @just-web/types@2.0.0
  - @just-web/app@2.0.0
  - @just-web/states@2.0.0

## 2.0.4

### Patch Changes

- @just-web/app@1.1.1
- @just-web/log@1.1.1
- @just-web/states@1.1.1
- @just-web/types@1.1.1

## 2.0.3

### Patch Changes

- @just-web/app@1.1.0
- @just-web/log@1.1.0
- @just-web/states@1.1.0
- @just-web/types@1.1.0

## 2.0.2

### Patch Changes

- @just-web/app@1.0.2
- @just-web/log@1.0.2
- @just-web/states@1.0.2
- @just-web/types@1.0.2

## 2.0.1

### Patch Changes

- Updated dependencies [9853c63]
  - @just-web/app@1.0.1
  - @just-web/log@1.0.1
  - @just-web/states@1.0.1
  - @just-web/types@1.0.1

## 2.0.0

### Patch Changes

- 564addf: Upgrade type-plus to 4.13.1

  Update `init()` and `start()` logs.

  Code comments are not kept so it that JSDocs will be available

- Updated dependencies [8c3183e]
- Updated dependencies [564addf]
- Updated dependencies [c228a89]
- Updated dependencies [8c3183e]
  - @just-web/app@1.0.0
  - @just-web/log@1.0.0
  - @just-web/states@1.0.0
  - @just-web/types@1.0.0

## 1.0.7

### Patch Changes

- @just-web/app@0.2.7

## 1.0.6

### Patch Changes

- @just-web/app@0.2.6

## 1.0.5

### Patch Changes

- Updated dependencies [d3e0770]
  - @just-web/app@0.2.5

## 1.0.4

### Patch Changes

- @just-web/app@0.2.4

## 1.0.3

### Patch Changes

- Updated dependencies [88ee900]
  - @just-web/app@0.2.3

## 1.0.2

### Patch Changes

- Updated dependencies [8b3eee7]
  - @just-web/app@0.2.2

## 1.0.1

### Patch Changes

- e8671c1: Rename `logContext` to `log` to match other props in the application.

  Update deps to fix bundling.
  `play-react` is not working again.

- Updated dependencies [e8671c1]
  - @just-web/app@0.2.1

## 1.0.0

### Minor Changes

- b056a08: Add micro-app support

### Patch Changes

- Updated dependencies [b056a08]
  - @just-web/app@0.2.0

## 0.1.1

### Patch Changes

- f2a3e89: Upgrade `iso-error` and `type-plus`.
  Downgrade package to ES2019 to better support webpack4 and older storybook environment.
- Updated dependencies [f2a3e89]
  - @just-web/app@0.1.1
