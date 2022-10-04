---
"@just-web/app": major
---

Default export is removed. Use `import { createApp } from '@just-web/app` instead.
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
import { createApp } from '@just-web/app'

createApp({ name: 'now-required' }).extend({
  name: 'plugin-name',
  init() { /* required */ },
  start() { /* optional */ }
})
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
