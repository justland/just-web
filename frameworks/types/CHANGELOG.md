# @just-web/types

## 3.1.1

## 3.1.0

### Minor Changes

- 3be5a2a2: Add `PluginContext` type to extract that from the plugin.

### Patch Changes

- ca54af50: Support `start(...): void`

## 3.0.0

### Patch Changes

- 7180f82: Update `type-plus` to 4.13.2.
- 0c21f10: Update deps from `workspace:^*` to `workspace:^`.

  `workspace:^*` is incorrect as during publish, the version is not replaced.

## 2.0.1

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

- cdd4f6b: `@just-web/log`: remove init log message.
  It does not match with new plugin init logs and is expected to be working.
  This also simplify testing as one less log entry to filter.

  `@just-web/log`: add support of `getNonConsoleLog()`, for `@just-web/browser`.

  `@just-web/log`: fix log ID prefixing

  `@just-web/browser`: logs captured error to `non-console` logger.

## 1.1.1

## 1.1.0

## 1.0.2

## 1.0.1

## 1.0.0

### Major Changes

- 8c3183e: Add `@just-web/types` for defining plugin modules.

  It contains `definePlugin()` and `PluginModule` type,
  as well as other functions and types to help writing plugins.

  Currently, `JustWebApp` and `JustWebTestApp` still resides within `@just-web/app`.

  We may move them here in the future.
