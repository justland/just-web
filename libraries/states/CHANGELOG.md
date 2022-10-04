# @just-web/states

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
