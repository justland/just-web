# @just-web/events

## 7.1.8

### Patch Changes

- ef288022: Update `typescript` to 5.1.3. This fix the gizmo function type issue.
- Updated dependencies [ef288022]
  - @just-web/app@7.2.1

## 7.1.7

### Patch Changes

- Updated dependencies [8eeca3e0]
  - @just-web/app@7.2.0

## 7.1.6

### Patch Changes

- 501df971: Update docs

## 7.1.5

### Patch Changes

- Updated dependencies [db021cdf]
  - @just-web/app@7.1.5

## 7.1.4

### Patch Changes

- @just-web/app@7.1.4

## 7.1.3

### Patch Changes

- Updated dependencies [dc0291fa]
  - @just-web/app@7.1.3

## 7.1.2

### Patch Changes

- e1f71278: Move `repobuddy` and `tslib` to devDependency
- Updated dependencies [e1f71278]
- Updated dependencies [d9b97f22]
  - @just-web/app@7.1.2

## 7.1.1

### Patch Changes

- Updated dependencies [61477ae9]
  - @just-web/app@7.1.1

## 7.1.0

### Patch Changes

- 793a4747: Move `@repobuddy/typescript` from `dependencies` to `devDependencies`.
- Updated dependencies [793a4747]
- Updated dependencies [29c25aaa]
- Updated dependencies [76b36bfa]
  - @just-web/app@7.1.0

## 7.0.1

### Patch Changes

- 6403b822: Improve code quality with newer TypeScript settings (using `@repobuddy/typescript`)
- Updated dependencies [6403b822]
  - @just-web/app@7.0.1

## 7.0.0

### Patch Changes

- Updated dependencies [ab9f056d]
- Updated dependencies [6684e0ef]
- Updated dependencies [78becd0d]
- Updated dependencies [736fa4b4]
- Updated dependencies [18455d27]
  - @just-web/app@7.0.0

## 7.0.0-beta.5

### Patch Changes

- Updated dependencies [6684e0ef]
  - @just-web/app@7.0.0-beta.5
  - @just-web/log@7.0.0-beta.5

## 7.0.0-beta.4

### Patch Changes

- Updated dependencies [736fa4b4]
  - @just-web/app@7.0.0-beta.4
  - @just-web/log@7.0.0-beta.4

## 7.0.0-beta.3

### Patch Changes

- Updated dependencies [18455d27]
  - @just-web/app@7.0.0-beta.3
  - @just-web/log@7.0.0-beta.3

## 7.0.0-beta.2

### Patch Changes

- Updated dependencies [78becd0d]
  - @just-web/app@7.0.0-beta.2
  - @just-web/log@7.0.0-beta.2

## 7.0.0-beta.1

### Patch Changes

- Updated dependencies [ab9f056d]
  - @just-web/app@7.0.0-beta.1
  - @just-web/log@7.0.0-beta.1

## 7.0.0-beta.0

### Patch Changes

- Updated dependencies [10489f4f]
  - @just-web/log@7.0.0-beta.0
  - @just-web/app@7.0.0-beta.0

## 6.0.2

### Patch Changes

- @just-web/log@6.0.2

## 6.0.1

### Patch Changes

- @just-web/log@6.0.1

## 6.0.0

### Patch Changes

- 34902993: Update `@unional/events-plus`
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

- @just-web/log@5.0.4

## 5.0.3

### Patch Changes

- Updated dependencies [3a4f7414]
  - @just-web/log@5.0.3

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
