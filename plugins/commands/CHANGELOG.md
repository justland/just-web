# @just-web/commands

## 7.2.4

### Patch Changes

- ef288022: Update `typescript` to 5.1.3. This fix the gizmo function type issue.
- Updated dependencies [ef288022]
  - @just-web/states@7.1.6
  - @just-web/keyboard@7.2.4
  - @just-web/app@7.2.1

## 7.2.3

### Patch Changes

- Updated dependencies [8eeca3e0]
  - @just-web/app@7.2.0
  - @just-web/states@7.1.5
  - @just-web/keyboard@7.2.3

## 7.2.2

### Patch Changes

- @just-web/keyboard@7.2.2

## 7.2.1

### Patch Changes

- @just-web/keyboard@7.2.1

## 7.2.0

### Minor Changes

- b1ed9372: Allow `command` to be used without `connect()`.
  Fix support on function overload.
  Fix `defaultHandler()` support.
  Change some type to `interface` for performance.

### Patch Changes

- eac446e6: Adjust logger id
- Updated dependencies [be2ff309]
  - @just-web/keyboard@7.2.0

## 7.1.5

### Patch Changes

- Updated dependencies [db021cdf]
  - @just-web/app@7.1.5
  - @just-web/states@7.1.5
  - @just-web/keyboard@7.1.5

## 7.1.4

### Patch Changes

- 4dd88bd8: Workaround `Partial<T>` issue with `exactOptionalPropertyType`.

  <https://github.com/microsoft/TypeScript/issues/46969#issuecomment-1528886328>

  This `Partial<T>` will be added to `type-plus`,
  but since `type-plus` is currently making some changes and will take a few more days to complete,
  the type is added here as a workaround.

  - @just-web/app@7.1.4
  - @just-web/states@7.1.4
  - @just-web/keyboard@7.1.4

## 7.1.3

### Patch Changes

- Updated dependencies [dc0291fa]
  - @just-web/app@7.1.3
  - @just-web/states@7.1.3
  - @just-web/keyboard@7.1.3

## 7.1.2

### Patch Changes

- 2d2cbbb5: enable `verbatimModuleSyntax`
- Updated dependencies [e1f71278]
- Updated dependencies [d9b97f22]
  - @just-web/app@7.1.2
  - @just-web/states@7.1.2
  - @just-web/keyboard@7.1.2

## 7.1.1

### Patch Changes

- Updated dependencies [61477ae9]
  - @just-web/app@7.1.1
  - @just-web/states@7.1.1
  - @just-web/keyboard@7.1.1

## 7.1.0

### Patch Changes

- 793a4747: Move `@repobuddy/typescript` from `dependencies` to `devDependencies`.
- 29c25aaa: Update `type-plus` 6.7.0
- Updated dependencies [793a4747]
- Updated dependencies [29c25aaa]
- Updated dependencies [76b36bfa]
  - @just-web/app@7.1.0
  - @just-web/states@7.1.0
  - @just-web/keyboard@7.1.0

## 7.0.1

### Patch Changes

- 6403b822: Improve code quality with newer TypeScript settings (using `@repobuddy/typescript`)
- Updated dependencies [6403b822]
  - @just-web/app@7.0.1
  - @just-web/states@7.0.1
  - @just-web/keyboard@7.0.1

## 7.0.0

### Patch Changes

- 3c0c09c2: Change default key for command palette to +k.
  It's patch as it is not used at the moment.
- b3af3da7: @just-web/commands should not pre-register "show command palette".

  It should be registered by the app or components that actually provides the implementation.

- Updated dependencies [ab9f056d]
- Updated dependencies [977e1d30]
- Updated dependencies [6684e0ef]
- Updated dependencies [78becd0d]
- Updated dependencies [a2ef64fb]
- Updated dependencies [c2c26431]
- Updated dependencies [736fa4b4]
- Updated dependencies [18455d27]
  - @just-web/app@7.0.0
  - @just-web/states@7.0.0
  - @just-web/keyboard@7.0.0

## 7.0.0-beta.5

### Patch Changes

- Updated dependencies [6684e0ef]
  - @just-web/app@7.0.0-beta.5
  - @just-web/states@7.0.0-beta.5
  - @just-web/keyboard@7.0.0-beta.5
  - @just-web/log@7.0.0-beta.5
  - @just-web/types@7.0.0-beta.5

## 7.0.0-beta.4

### Patch Changes

- b3af3da7: @just-web/commands should not pre-register "show command palette".

  It should be registered by the app or components that actually provides the implementation.

- Updated dependencies [736fa4b4]
  - @just-web/app@7.0.0-beta.4
  - @just-web/states@7.0.0-beta.4
  - @just-web/keyboard@7.0.0-beta.4
  - @just-web/log@7.0.0-beta.4
  - @just-web/types@7.0.0-beta.4

## 7.0.0-beta.3

### Patch Changes

- Updated dependencies [18455d27]
  - @just-web/app@7.0.0-beta.3
  - @just-web/log@7.0.0-beta.3
  - @just-web/states@7.0.0-beta.3
  - @just-web/keyboard@7.0.0-beta.3
  - @just-web/types@7.0.0-beta.3

## 7.0.0-beta.2

### Patch Changes

- Updated dependencies [78becd0d]
  - @just-web/app@7.0.0-beta.2
  - @just-web/states@7.0.0-beta.2
  - @just-web/keyboard@7.0.0-beta.2
  - @just-web/log@7.0.0-beta.2
  - @just-web/types@7.0.0-beta.2

## 7.0.0-beta.1

### Patch Changes

- Updated dependencies [ab9f056d]
  - @just-web/app@7.0.0-beta.1
  - @just-web/states@7.0.0-beta.1
  - @just-web/keyboard@7.0.0-beta.1
  - @just-web/log@7.0.0-beta.1
  - @just-web/types@7.0.0-beta.1

## 7.0.0-beta.0

### Patch Changes

- 3c0c09c2: Change default key for command palette to +k.
  It's patch as it is not used at the moment.
- Updated dependencies [977e1d30]
- Updated dependencies [a2ef64fb]
- Updated dependencies [c2c26431]
- Updated dependencies [10489f4f]
  - @just-web/states@7.0.0-beta.0
  - @just-web/log@7.0.0-beta.0
  - @just-web/keyboard@7.0.0-beta.0
  - @just-web/app@7.0.0-beta.0
  - @just-web/types@7.0.0-beta.0

## 6.0.2

### Patch Changes

- @just-web/keyboard@6.0.2
- @just-web/log@6.0.2
- @just-web/states@6.0.2
- @just-web/types@6.0.2

## 6.0.1

### Patch Changes

- @just-web/keyboard@6.0.1
- @just-web/log@6.0.1
- @just-web/states@6.0.1
- @just-web/types@6.0.1

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
  - @just-web/types@6.0.0
  - @just-web/states@6.0.0
  - @just-web/keyboard@6.0.0

## 5.0.4

### Patch Changes

- Updated dependencies [8e9d5955]
  - @just-web/states@5.0.4
  - @just-web/keyboard@5.0.4
  - @just-web/log@5.0.4
  - @just-web/types@5.0.4

## 5.0.3

### Patch Changes

- 3a4f7414: Update `standard-log`
- Updated dependencies [3a4f7414]
- Updated dependencies [11e57e0e]
  - @just-web/log@5.0.3
  - @just-web/types@5.0.3
  - @just-web/states@5.0.3
  - @just-web/keyboard@5.0.3

## 5.0.2

### Patch Changes

- @just-web/keyboard@5.0.2
- @just-web/log@5.0.2
- @just-web/states@5.0.2
- @just-web/types@5.0.2

## 5.0.1

### Patch Changes

- 17e3bd65: adjust `import type` to reduce imports
- Updated dependencies [17e3bd65]
  - @just-web/keyboard@5.0.1
  - @just-web/log@5.0.1
  - @just-web/states@5.0.1
  - @just-web/types@5.0.1

## 5.0.0

### Major Changes

- d3db351f: Remove `JustCommand`.

  Remove `Command_WithDefault`. Now use the same `Command` type.

  `Command` generic type changed to `F` in order to work with function overloads.

  `Command.handler` and `Command.defineArgs` are removed.

  `connect()` is now the only way to setup the command.

  `handlerRegistry.register` is simplified to just take `id`.

### Minor Changes

- 12576b56: Add ESM support

### Patch Changes

- d3db351f: Update `type-plus`
- 74329e86: Remove usage of `StartContext`.
  `@just-web/presets-browser`: Export additional types.
- Updated dependencies [0e94214c]
- Updated dependencies [d3db351f]
- Updated dependencies [12576b56]
- Updated dependencies [74329e86]
  - @just-web/states@5.0.0
  - @just-web/log@5.0.0
  - @just-web/types@5.0.0
  - @just-web/keyboard@5.0.0

## 5.0.0-beta.0

### Major Changes

- d3db351f: Remove `JustCommand`.

  Remove `Command_WithDefault`. Now use the same `Command` type.

  `Command` generic type changed to `F` in order to work with function overloads.

  `Command.handler` and `Command.defineArgs` are removed.

  `connect()` is now the only way to setup the command.

  `handlerRegistry.register` is simplified to just take `id`.

### Minor Changes

- 12576b56: Add ESM support

### Patch Changes

- d3db351f: Update `type-plus`
- 74329e86: Remove usage of `StartContext`.
  `@just-web/presets-browser`: Export additional types.
- Updated dependencies [0e94214c]
- Updated dependencies [d3db351f]
- Updated dependencies [12576b56]
- Updated dependencies [74329e86]
  - @just-web/states@5.0.0-beta.0
  - @just-web/log@5.0.0-beta.0
  - @just-web/types@5.0.0-beta.0
  - @just-web/keyboard@5.0.0-beta.0

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
