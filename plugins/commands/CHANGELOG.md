# @just-web/commands

## 1.1.0

### Patch Changes

- @just-web/contributions@1.1.0
- @just-web/log@1.1.0
- @just-web/states@1.1.0
- @just-web/types@1.1.0

## 1.0.2

### Patch Changes

- Updated dependencies [14cb2de]
  - @just-web/contributions@1.0.2
  - @just-web/log@1.0.2
  - @just-web/states@1.0.2
  - @just-web/types@1.0.2

## 1.0.1

### Patch Changes

- @just-web/contributions@1.0.1
- @just-web/log@1.0.1
- @just-web/states@1.0.1
- @just-web/types@1.0.1

## 1.0.0

### Patch Changes

- b262ab5: Commands can be added irrespective of contributions.

  This means contributions are now public contributions,
  and we can register commands that are internal to the application.

  This is the same model as VS Code.

  Originally I want all commands to be public,
  so that we can access every command everywhere.

  But there are use cases that commands can be used within a subsection of an application.
  For example, some UI internal commands for interactions.

  In those cases, it doesn't make sense to make those command public.

  `invoke()` now returns the value returned from the handler.
  It is not typed at the moment.

  Will need to revisit it to figure out how to type the command's return type.

  May need to create a replacement of the `JustEvent` from `@unional/events-plus`.

- 564addf: Upgrade type-plus to 4.13.1

  Update `init()` and `start()` logs.

  Code comments are not kept so it that JSDocs will be available

- Updated dependencies [564addf]
- Updated dependencies [c228a89]
- Updated dependencies [8c3183e]
  - @just-web/contributions@1.0.0
  - @just-web/log@1.0.0
  - @just-web/states@1.0.0
  - @just-web/types@1.0.0

## 0.2.5

### Patch Changes

- Updated dependencies [4215e3c]
  - @just-web/states@0.2.3
  - @just-web/contributions@0.2.3

## 0.2.4

### Patch Changes

- Updated dependencies [c99cfc2]
- Updated dependencies [862b5a8]
  - @just-web/log@0.2.2
  - @just-web/states@0.2.2
  - @just-web/contributions@0.2.2

## 0.2.3

### Patch Changes

- 454bd7c: fix `invoke()` type

## 0.2.2

### Patch Changes

- 4d6dcf5: Support commands with arguments.

## 0.2.1

### Patch Changes

- e8671c1: Rename `logContext` to `log` to match other props in the application.

  Update deps to fix bundling.
  `play-react` is not working again.

- Updated dependencies [e8671c1]
  - @just-web/contributions@0.2.1
  - @just-web/log@0.2.1
  - @just-web/states@0.2.1

## 0.2.0

### Minor Changes

- b056a08: Add micro-app support

### Patch Changes

- Updated dependencies [b056a08]
  - @just-web/contributions@0.2.0
  - @just-web/log@0.2.0
  - @just-web/states@0.2.0

## 0.1.1

### Patch Changes

- f2a3e89: Upgrade `iso-error` and `type-plus`.
  Downgrade package to ES2019 to better support webpack4 and older storybook environment.
- Updated dependencies [f2a3e89]
  - @just-web/contributions@0.1.1
  - @just-web/log@0.1.1
  - @just-web/states@0.1.1
