# @just-web/app

## 7.3.1

### Patch Changes

- 4d16182: Update ESM module file extensions from `.js` to `.mjs` and type definitions from `.d.ts` to `.d.mts` to align with tsdown 0.17.0 build output format.
- Updated dependencies [4d16182]
  - @just-web/id@7.3.1
  - @just-web/log@7.3.1

## 7.3.0

### Minor Changes

- cea9ef5: Build with `tsdown` to get around the TypeScript 5.2 issue with CJS builds.

### Patch Changes

- Updated dependencies [cea9ef5]
  - @just-web/log@7.3.0
  - @just-web/id@7.3.0

## 7.2.1

### Patch Changes

- ef288022: Update `typescript` to 5.1.3. This fix the gizmo function type issue.
- Updated dependencies [ef288022]
  - @just-web/log@7.2.1
  - @just-web/id@7.2.1

## 7.2.0

### Minor Changes

- 8eeca3e0: Update `@unional/gizmo` to add support of sync `create()`.

### Patch Changes

- Updated dependencies [8eeca3e0]
  - @just-web/log@7.2.0
  - @just-web/id@7.2.0

## 7.1.5

### Patch Changes

- db021cdf: Update type-plus
- Updated dependencies [db021cdf]
  - @just-web/log@7.1.5
  - @just-web/id@7.1.5

## 7.1.4

### Patch Changes

- Updated dependencies [33b354e8]
  - @just-web/id@7.1.4
  - @just-web/log@7.1.4

## 7.1.3

### Patch Changes

- dc0291fa: Update `@unional/gizmo`
- Updated dependencies [dc0291fa]
  - @just-web/id@6.0.7
  - @just-web/log@7.1.3

## 7.1.2

### Patch Changes

- e1f71278: Move `repobuddy` and `tslib` to devDependency
- d9b97f22: Enable `verbatimModuleSyntax`
- Updated dependencies [e1f71278]
- Updated dependencies [d0fc1710]
  - @just-web/id@6.0.6
  - @just-web/log@7.1.2

## 7.1.1

### Patch Changes

- 61477ae9: Update to use `@unional/gizmo` v2
- Updated dependencies [61477ae9]
  - @just-web/id@6.0.5
  - @just-web/log@7.1.1

## 7.1.0

### Minor Changes

- 76b36bfa: Add `justApp.Infer<A>`

### Patch Changes

- 793a4747: Move `@repobuddy/typescript` from `dependencies` to `devDependencies`.
- 29c25aaa: Update `type-plus` 6.7.0
- Updated dependencies [793a4747]
- Updated dependencies [29c25aaa]
  - @just-web/id@6.0.4
  - @just-web/log@7.1.0

## 7.0.1

### Patch Changes

- 6403b822: Improve code quality with newer TypeScript settings (using `@repobuddy/typescript`)
- Updated dependencies [6403b822]
  - @just-web/id@6.0.3
  - @just-web/log@7.0.1

## 7.0.0

### Major Changes

- Underlying plugin system is replaced by [@unional/gizmo](https://www.npmjs.com/package/@unional/gizmo).
  The pre-tree instantiation is removed.\
  Each _gizmo_ will create a new instance every time.\
  This is the `always-create` instantiation strategy.
  Other strategies will be supported later,\
  including bringing back the `pre-tree` instantiation.\
  For more info, please refer to [this issue](https://github.com/unional/async-fp/issues/162)

### Minor Changes

- 6684e0ef: Update `@unional/gizmo` to 1.2.0.

  Add support of `init()`, `merge()`, and the `create(start)` feature.

### Patch Changes

- ab9f056d: Expose `GizmoIncubator`.

  Exposing the needed type one by one to identify the behavior causing:

  ```txt
  The inferred type of 'app1' cannot be named without a reference to '.../node_modules/@unional/gizmo'. This is likely not portable. A type annotation is necessary
  ```

  This release test if exposing just on `index` side is enough to fix the issue also for `testing`.

- 78becd0d: Add `JestTestApp` type
- 736fa4b4: Export additional types and code through `/testing`
- 18455d27: Add `emitLog` support during tests
- Updated dependencies [10489f4f]
- Updated dependencies [18455d27]
  - @just-web/log@7.0.0

## 7.0.0-beta.5

### Minor Changes

- 6684e0ef: Update `@unional/gizmo` to 1.2.0.

  Add support of `init()`, `merge()`, and the `create(start)` feature.

### Patch Changes

- @just-web/log@7.0.0-beta.5
- @just-web/types@7.0.0-beta.5

## 7.0.0-beta.4

### Patch Changes

- 736fa4b4: Export additional types and code through `/testing`
  - @just-web/log@7.0.0-beta.4
  - @just-web/types@7.0.0-beta.4

## 7.0.0-beta.3

### Patch Changes

- 18455d27: Add `emitLog` support during tests
- Updated dependencies [18455d27]
  - @just-web/log@7.0.0-beta.3
  - @just-web/types@7.0.0-beta.3

## 7.0.0-beta.2

### Patch Changes

- 78becd0d: Add `JestTestApp` type
  - @just-web/log@7.0.0-beta.2
  - @just-web/types@7.0.0-beta.2

## 7.0.0-beta.1

### Patch Changes

- ab9f056d: Expose `GizmoIncubator`.

  Exposing the needed type one by one to identify the behavior causing:

  ```txt
  The inferred type of 'app1' cannot be named without a reference to '.../node_modules/@unional/gizmo'. This is likely not portable. A type annotation is necessary
  ```

  This release test if exposing just on `index` side is enough to fix the issue also for `testing`.

  - @just-web/log@7.0.0-beta.1
  - @just-web/types@7.0.0-beta.1

## 7.0.0-beta.0

### Patch Changes

- Updated dependencies [10489f4f]
  - @just-web/log@7.0.0-beta.0
  - @just-web/types@7.0.0-beta.0

## 6.0.2

### Patch Changes

- @just-web/log@6.0.2
- @just-web/types@6.0.2

## 6.0.1

### Patch Changes

- @just-web/log@6.0.1
- @just-web/types@6.0.1

## 6.0.0

### Major Changes

- f174e16f: Remove `StartContext` variants.

  The `StartContextBase` is renamed as `StartContext`.

  The return type of `init()` remains as `[PluginContext]`.

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

## 5.0.4

### Patch Changes

- @just-web/log@5.0.4
- @just-web/types@5.0.4

## 5.0.3

### Patch Changes

- Updated dependencies [3a4f7414]
  - @just-web/log@5.0.3
  - @just-web/types@5.0.3

## 5.0.2

### Patch Changes

- @just-web/log@5.0.2
- @just-web/types@5.0.2

## 5.0.1

### Patch Changes

- @just-web/log@5.0.1
- @just-web/types@5.0.1

## 5.0.0

### Minor Changes

- 12576b56: Add ESM support

### Patch Changes

- d3db351f: Update `type-plus`
- Updated dependencies [d3db351f]
- Updated dependencies [12576b56]
  - @just-web/log@5.0.0
  - @just-web/types@5.0.0

## 5.0.0-beta.0

### Minor Changes

- 12576b56: Add ESM support

### Patch Changes

- d3db351f: Update `type-plus`
- Updated dependencies [d3db351f]
- Updated dependencies [12576b56]
  - @just-web/log@5.0.0-beta.0
  - @just-web/types@5.0.0-beta.0

## 4.1.0

### Patch Changes

- Updated dependencies [3d4a51e3]
  - @just-web/types@4.1.0
  - @just-web/log@4.1.0

## 4.0.2

### Patch Changes

- @just-web/log@4.0.2
- @just-web/types@4.0.2

## 4.0.1

### Patch Changes

- a82e080a: Adjust starting log message
  - @just-web/log@4.0.1
  - @just-web/types@4.0.1

## 4.0.0

### Patch Changes

- 1e92661d: Update `type-plus` to `4.15.2`.
- 7b3b99c0: Allow plugin with partial `NeedContext`

  Improve `extend()` type to use `LeftJoin` for return type.

- 9b004db7: Update `type-plus` to use `MaybePromise.transform()`
- Updated dependencies [1e92661d]
- Updated dependencies [5729f2c0]
- Updated dependencies [9b004db7]
  - @just-web/log@4.0.0
  - @just-web/types@4.0.0

## 3.1.1

### Patch Changes

- @just-web/log@3.1.1
- @just-web/types@3.1.1

## 3.1.0

### Patch Changes

- Updated dependencies [3be5a2a2]
- Updated dependencies [ca54af50]
- Updated dependencies [085a2d1e]
  - @just-web/types@3.1.0
  - @just-web/log@3.1.0

## 3.0.0

### Patch Changes

- 7180f82: Update `type-plus` to 4.13.2.
- 0c21f10: Update deps from `workspace:^*` to `workspace:^`.

  `workspace:^*` is incorrect as during publish, the version is not replaced.

- Updated dependencies [7180f82]
- Updated dependencies [0c21f10]
  - @just-web/log@3.0.0
  - @just-web/types@3.0.0

## 2.0.1

### Patch Changes

- 3905f21: fix(`@just-web/app`): add missing `getNonConsoleLogger()`
- 372ab7e: `@just-web/app`: starts newly added plugin when calling `start()` again.
  `@just-web/react`: fix `lazyImport()` to start the plugin correctly.

  The signature of `lazyImport()` changed.
  But since this is so new, keep it as a patch.

  - @just-web/log@2.0.1
  - @just-web/types@2.0.1

## 2.0.0

### Patch Changes

- Updated dependencies [89f4a41]
- Updated dependencies [cdd4f6b]
- Updated dependencies [8d9a1b9]
  - @just-web/log@2.0.0
  - @just-web/types@2.0.0

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

- 9853c63: Move `@just-web/log` and `@just-web/types` to peer dependencies.
  The application will need to reference them directly when creating local plugins and modules.
  Thus, the application need to import and add them as dependencies.
  - @just-web/log@1.0.1
  - @just-web/types@1.0.1

## 1.0.0

### Major Changes

- 8c3183e: Default export is removed. Use `import { createApp } from '@just-web/app` instead.
  This is done to avoid confusion,
  and may reserve default export for other things.

  The overall design is overhauled.

  Now `createApp()` only build in `@just-web/log`.
  `@just-web/platform` is removed and code moved to `@just-web/browser` and other places.
  So that it is center around logic, which each platform (browser, nodejs, etc) will provide implementation for the features.
  Instead of getting a common set of API by abstracting the `platform`.

  `@just-web/contributions`, `@just-web/commands`, `@just-web/errors` (moved to `@just-web/browser`) are all optional.

  You will need to add them in if you need them.

  This change keeps the core app very small and compact,
  thus making the design very flexible.

  The plugin mechanism is updated that now through the `extend()` method:

  ```ts
  import { createApp } from "@just-web/app";

  createApp({ name: "now-required" }).extend({
    name: "plugin-name",
    init() {
      /* required */
    },
    start() {
      /* optional */
    },
  });
  ```

  Use the `definePlugin()` method from `@just-web/types` to define the plugin creator function `() => PluginModule`, which will do some sophisticate type checking and inferring for you.

  The function can take params (they are typed) so that you can customize the plugin as needed.

  ```ts
  // original
  createApp({ /* various plugin options go here */ }).addPlugin(...)

  // now
  createApp({})
    .extend(pluginA(/* options */))
    .extend(pluginB(/* options */))
    .extend(pluginC(/* options */))
  ```

  Also, the `plugin.init()` is now synchronous. Instead of async as in `activate(): Promise<...>`.

  This mean loading of plugins should be handled outside, instead of inside.

  As the `createApp()` are slimmed down, so as `@just-web/app`.
  It does not re-export `@just-web/log|contributions|commands|states` anymore.
  You can add them as direct dependency and import them.

  The plugin dependencies are added as `peerDependencies`, so you will need to install them directly.
  This generally simplify the dependency management and is easier to spot any duplicate/version mismatch.

  May core package are new versioned together, similar to `@storybook/addon-*`.

  `@just-web/format` is moved into `@just-web/commands` and `@just-web/contributions`.
  i18n should be done at application level,
  and will figure out a way to do it.

### Patch Changes

- 564addf: Upgrade type-plus to 4.13.1

  Update `init()` and `start()` logs.

  Code comments are not kept so it that JSDocs will be available

- Updated dependencies [564addf]
- Updated dependencies [c228a89]
- Updated dependencies [8c3183e]
  - @just-web/log@1.0.0
  - @just-web/types@1.0.0

## 0.2.7

### Patch Changes

- Updated dependencies [4215e3c]
  - @just-web/states@0.2.3
  - @just-web/commands@0.2.5
  - @just-web/contributions@0.2.3
  - @just-web/errors@0.2.3
  - @just-web/platform@0.2.5
  - @just-web/format@0.2.5

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
