# @just-web/events

## 5.0.2

### Patch Changes

- @just-web/log@5.0.2

## 5.0.1

### Patch Changes

- 17e3bd65: adjust `import type` to reduce imports
  - @just-web/log@5.0.1

## 5.0.0

### Minor Changes

- 12576b56: Add ESM support

### Patch Changes

- 74329e86: Remove usage of `StartContext`.
  `@just-web/presets-browser`: Export additional types.
- Updated dependencies [d3db351f]
- Updated dependencies [12576b56]
  - @just-web/log@5.0.0

## 5.0.0-beta.0

### Minor Changes

- 12576b56: Add ESM support

### Patch Changes

- 74329e86: Remove usage of `StartContext`.
  `@just-web/presets-browser`: Export additional types.
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

### Patch Changes

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

### Patch Changes

- 0c21f10: Update deps from `workspace:^*` to `workspace:^`.

  `workspace:^*` is incorrect as during publish, the version is not replaced.

- Updated dependencies [7180f82]
- Updated dependencies [0c21f10]
  - @just-web/log@3.0.0

## 2.0.1

### Patch Changes

- @just-web/log@2.0.1

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

### Patch Changes

- 8a4b0d6: Improve types.

  The event emitter type is now inferred based on `options.emitter` or default to `eventemitter3`.

  Fixed the `EventsContext` and provides the `EventsOptions` type.

- Updated dependencies [89f4a41]
- Updated dependencies [cdd4f6b]
  - @just-web/log@2.0.0

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

### Patch Changes

- Updated dependencies [564addf]
- Updated dependencies [c228a89]
- Updated dependencies [8c3183e]
  - @just-web/log@1.0.0
  - @just-web/types@1.0.0

## 0.2.4

### Patch Changes

- Updated dependencies [c99cfc2]
  - @just-web/log@0.2.2

## 0.2.3

### Patch Changes

- 4d6dcf5: Update `@unional/events-plus`

## 0.2.2

### Patch Changes

- 8b3eee7: Update `events-plus`

## 0.2.1

### Patch Changes

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
