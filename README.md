# just-web

`@just-web` is plugin-based application framework.

As a good framework, it defers making decisions as much as possible.
Meaning you have the freedom to choose your tech stacks or even changing them as the landscape of web development changes.

You can use:

- `React`, `Vue.js`, `SolidJS`, `Svelte`, etc. as your rendering library,
- `redux` or `mobx` or anything else as your application state management,
- `axios` or `cross-fetch` or vanilla fetch as your fetching mechanism,
- ...and so on.

## Installing

For application development:

```sh
npm install @just-web/app
```

For plugin development:

```sh
npm install --save-peer @just-web/contexts
```

## Components

Components refer to UI components.

Here are the components provided in this repository:

- [`@just-web/react-commands`]: [`React`] components to the [`@just-web/commands`] module.

## Plugins

Here are the plugins provided in this repository:

- [`@just-web/routes`]: provides routing capability.

## Tools

`@just-web` provides some tools to make it easier for you to develop your application:

- `@just-web/create`: 🚧 `@just-web` initializer package (for `npm create`) to scaffold your project.
- [`@just-web/repo-scripts`]: provides scripts and default configs to help to maintain your repository.
- [`@just-web/testing`]: testing utility module.

## Contribute

Please check out the [contributing guide](./CONTRIBUTING.md)

[`@just-web/commands`]: https://github.com/justland/just-web/tree/main/frameworks/commands
[`@just-web/react-commands`]: https://github.com/justland/just-web/tree/main/components/react-commands
[`@just-web/routes`]: https://github.com/justland/just-web/tree/main/plugins/routes
[`@just-web/repo-scripts`]: https://github.com/justland/just-web/tree/main/tools/repo-scripts
[`@just-web/testing`]: https://github.com/justland/just-web/tree/main/tools/testing
[`React`]: https://reactjs.org/
