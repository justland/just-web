# @just-web/commands

## 4.1.0

### Patch Changes

- Updated dependencies [3d4a51e3]
  - @just-web/types@4.1.0
  - @just-web/log@4.1.0
  - @just-web/keyboard@4.1.0
  - @just-web/states@4.1.0

## 4.0.2

### Patch Changes

- @just-web/keyboard@4.0.2
- @just-web/log@4.0.2
- @just-web/states@4.0.2
- @just-web/types@4.0.2

## 4.0.1

### Patch Changes

- @just-web/keyboard@4.0.1
- @just-web/log@4.0.1
- @just-web/states@4.0.1
- @just-web/types@4.0.1

## 4.0.0

### Patch Changes

- 1e92661d: Update `type-plus` to `4.15.2`.
- 0987acac: Will not register if there is no handler
- 24558c6f: Support partial keyboard context for `JustCommand`
- 9b004db7: Update `type-plus` to use `MaybePromise.transform()`
- Updated dependencies [1e92661d]
- Updated dependencies [1e92661d]
- Updated dependencies [5729f2c0]
- Updated dependencies [e9e5e2f0]
- Updated dependencies [9b004db7]
  - @just-web/log@4.0.0
  - @just-web/types@4.0.0
  - @just-web/states@4.0.0
  - @just-web/keyboard@4.0.0

## 3.1.1

### Patch Changes

- d93f524c: Set `id` as the command function `name`.
- adebc089: Connects `showCommandPalate` instead of the `just` variant
- cf41bf89: Make `KeyboardContext` optional.

  This allows the command to be used in an application that does not need key binding support,
  even if the command has key bindings.

  - @just-web/keyboard@3.1.1
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
  - @just-web/keyboard@3.1.0
  - @just-web/states@3.1.0

## 3.0.0

### Major Changes

- 5eb37cd: Adding `connect()` back to `command()` and `justCommand()`.

  `justCommand()` is still experimental.
  I'm still trying to figure out how the arguments and return value should be structured.

- 7180f82: Rename `type` and `command` to `id`.
  This is needed to keep things normalized.

  Add `command(contribution)`.
  It combines both `CommandContribution` and `KeyBindingContribution`.

- 7180f82: Add support to declare `command()` with contributions.

  ```ts
  command({
    id: 'plugin-a.increment',
    name: 'Increment',
    description: 'Increment input value by 1',
    key: 'ctrl+k'
  })
  ```

  Add `justCommand()`. A `just-func` variant of `command()`

### Patch Changes

- edbca92: `@just-web/commands`: move types to fix a circular ref issue.

  There are two `Command` types.
  One is renamed to `CommandHandler` because that's what it is.
  Should not be used directly anyway, so it is not a breaking change.

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
  - @just-web/keyboard@3.0.0

## 2.0.1

### Patch Changes

- @just-web/keyboard@2.0.1
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

- a106645: Add `command()`, as a replacement of `justEvent()`.

  `justEvent()` is suitable for events but not commands.
  It was used as a stop gap before we have time to add `command()`.

### Patch Changes

- Updated dependencies [89f4a41]
- Updated dependencies [cdd4f6b]
- Updated dependencies [8d9a1b9]
  - @just-web/log@2.0.0
  - @just-web/types@2.0.0
  - @just-web/keyboard@2.0.0
  - @just-web/states@2.0.0

## 1.1.1

### Patch Changes

- @just-web/contributions@1.1.1
- @just-web/log@1.1.1
- @just-web/states@1.1.1
- @just-web/types@1.1.1

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
