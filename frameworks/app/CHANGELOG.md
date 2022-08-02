# @just-web/app

## 0.2.6

### Patch Changes

- Updated dependencies [c99cfc2]
- Updated dependencies [862b5a8]
  - @just-web/log@0.2.2
  - @just-web/states@0.2.2
  - @just-web/commands@0.2.4
  - @just-web/contributions@0.2.2
  - @just-web/platform@0.2.4
  - @just-web/errors@0.2.2
  - @just-web/format@0.2.4

## 0.2.5

### Patch Changes

- d3e0770: Fix plugin module becomes frozen issue.

  The plugin module was added to an unused `Store`,
  which as a store value, it becomes deeply frozen.

## 0.2.4

### Patch Changes

- Updated dependencies [454bd7c]
  - @just-web/commands@0.2.3
  - @just-web/platform@0.2.3
  - @just-web/format@0.2.3

## 0.2.3

### Patch Changes

- 88ee900: adjust `addPlugin` generics
- Updated dependencies [4d6dcf5]
  - @just-web/commands@0.2.2
  - @just-web/platform@0.2.2
  - @just-web/format@0.2.2

## 0.2.2

### Patch Changes

- 8b3eee7: Remove `createContext()` from export.

  Plugins should use `createTestApp()` for testing

## 0.2.1

### Patch Changes

- e8671c1: Rename `logContext` to `log` to match other props in the application.

  Update deps to fix bundling.
  `play-react` is not working again.

- Updated dependencies [e8671c1]
  - @just-web/commands@0.2.1
  - @just-web/contributions@0.2.1
  - @just-web/errors@0.2.1
  - @just-web/log@0.2.1
  - @just-web/platform@0.2.1
  - @just-web/states@0.2.1
  - @just-web/format@0.2.1

## 0.2.0

### Minor Changes

- b056a08: Add micro-app support

### Patch Changes

- Updated dependencies [b056a08]
  - @just-web/commands@0.2.0
  - @just-web/contributions@0.2.0
  - @just-web/errors@0.2.0
  - @just-web/format@0.2.0
  - @just-web/log@0.2.0
  - @just-web/platform@0.2.0
  - @just-web/states@0.2.0

## 0.1.1

### Patch Changes

- f2a3e89: Upgrade `iso-error` and `type-plus`.
  Downgrade package to ES2019 to better support webpack4 and older storybook environment.
- Updated dependencies [f2a3e89]
  - @just-web/commands@0.1.1
  - @just-web/contributions@0.1.1
  - @just-web/errors@0.1.1
  - @just-web/log@0.1.1
  - @just-web/platform@0.1.1
  - @just-web/states@0.1.1
  - @just-web/format@0.1.1
