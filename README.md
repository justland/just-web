# just-web

`@just-web` is a plugin-based application framework.

As a good framework, it defers making decisions as much as possible.
Meaning you have the freedom to choose your tech stacks or even changing them as the landscape of web development changes.

You can use:

- `React`, `Vue.js`, `SolidJS`, `Svelte`, etc. as your rendering library,
- `redux` or `mobx` or anything else to manage your application state,
- `axios` or `cross-fetch` or vanilla fetch as your fetching mechanism,
- ...and so on.

## Installing

For application development:

```sh
npm install @just-web/app
```

For plugin development:

```sh
npm install --save-peer @just-web/app
```

## Libraries

Libraries are additional packages that you can use for specific scenarios.

- [`@just-web/react`]: additional utilities when using [`@just-web`] with [`React`].
- [`@just-web/states`]: state management library used by [`@just-web`].

## Components

Components refer to UI components.

Here are the components provided in this repository:

- [`@just-web/react-commands`]: [`React`] components to the [`@just-web/commands`] module.

## Plugins

Here are the plugins provided in this repository:

- [`@just-web/browser`]: provides browser specific capability.
- [`@just-web/browser-contributions`]: provides [@just-web/contributions] implementation on the browser.
- [`@just-web/browser-preferences`]: provides [@just-web/preferences] implementation on the browser.
- [`@just-web/commands`]: provides commands registration and invocation.
- [`@just-web/contributions`]: provides contribution metadata storage.
- [`@just-web/events`]: provides pub/sub events capability.
- [`@just-web/os`]: provides Operating System related capability.
- [`@just-web/preferences`]: provides user preference capability.
- [`@just-web/routes`]: provides routing capability.

## Tools

`@just-web` provides some tools to make it easier for you to develop your application:

- `@just-web/create`: 🚧 `@just-web` initializer package (for `npm create`) to scaffold your project.
- [`@just-web/repo-scripts`]: provides scripts and default configs to help to maintain your repository.
- [`@just-web/testing`]: testing utility module.

## Contribute

Please check out the [contributing guide](./CONTRIBUTING.md)

[`@just-web`]: https://github.com/justland/just-web
[`@just-web/commands`]: https://github.com/justland/just-web/tree/main/plugins/commands
[`@just-web/react`]: https://github.com/justland/just-web/tree/main/libraries/react
[`@just-web/react-commands`]: https://github.com/justland/just-web/tree/main/components/react-commands
[`@just-web/routes`]: https://github.com/justland/just-web/tree/main/plugins/routes
[`@just-web/repo-scripts`]: https://github.com/justland/just-web/tree/main/tools/repo-scripts
[`@just-web/states`]: https://github.com/justland/just-web/tree/main/libraries/states
[`@just-web/testing`]: https://github.com/justland/just-web/tree/main/tools/testing
[`React`]: https://reactjs.org/
