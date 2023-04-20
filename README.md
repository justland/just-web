# just-web

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[@just-web] is a plugin-based application framework.

As a good framework, it defers making decisions as much as possible.
Meaning you have the freedom to choose your tech stacks or even changing them as the landscape of web development changes.

You can use:

- [React], [Vue.js], [SolidJS], [Svelte], etc. as your rendering library,
- [Redux], [MobX] or anything else to manage your application state,
- [Axios], [cross-fetch] or vanilla fetch as your fetching mechanism,
- ...and so on.

## Installing

For application:

```sh
npm install @just-web/app

yarn add @just-web/app

pnpm add @just-web/app
```

For library:

```sh
npm install --save-peer @just-web/app

yarn add --peer @just-web/app

pnpm add --save-peer @just-web/app
```

## Frameworks

- [@just-web/app]: provides the entry point for creating a [@just-web] application.

## Libraries

Libraries are additional packages that you can use for specific scenarios.

- [@just-web/react]: additional utilities when using [@just-web] with [React].
- [@just-web/states]: state management library used by [@just-web].

## Components

Components refer to UI components.

Here are the components provided in this repository:

- [@just-web/react-commands]: [React] components to the [@just-web/commands] module.

## Plugins

Here are the plugins provided in this repository:

- [@just-web/browser]: provides browser specific capability.
- [@just-web/browser-keyboard]: provides [@just-web/keyboard] implementation on the browser.
- [@just-web/browser-preferences]: provides [@just-web/preferences] implementation on the browser.
- [@just-web/commands]: provides commands registration and invocation.
- [@just-web/keyboard]: provides contribution metadata storage.
- [@just-web/events]: provides pub/sub events capability.
- [@just-web/os]: provides Operating System related capability.
- [@just-web/preferences]: provides user preference capability.
- [@just-web/routes]: provides routing capability.

## Tools

[@just-web] provides some tools to make it easier for you to develop your application:

- `@just-web/create`: 🚧 [@just-web] initializer package (for `npm create`) to scaffold your project.
- [@just-web/repo-scripts]: provides scripts and default configs to help maintain your repository.

## Contribute

Please check out the [contributing guide](./CONTRIBUTING.md)

[@just-web]: https://github.com/justland/just-web
[@just-web/app]: https://github.com/justland/just-web/tree/main/frameworks/app
[@just-web/browser-keyboard]: https://github.com/justland/just-web/tree/main/plugins/browser-keyboard
[@just-web/browser-preferences]: https://github.com/justland/just-web/tree/main/plugins/browser-preferences
[@just-web/browser]: https://github.com/justland/just-web/tree/main/plugins/browser
[@just-web/commands]: https://github.com/justland/just-web/tree/main/plugins/commands
[@just-web/keyboard]: https://github.com/justland/just-web/tree/main/plugins/keyboard
[@just-web/events]: https://github.com/justland/just-web/tree/main/plugins/events
[@just-web/os]: https://github.com/justland/just-web/tree/main/plugins/os
[@just-web/preferences]: https://github.com/justland/just-web/tree/main/plugins/preferences
[@just-web/react-commands]: https://github.com/justland/just-web/tree/main/components/react-commands
[@just-web/react]: https://github.com/justland/just-web/tree/main/libraries/react
[@just-web/repo-scripts]: https://github.com/justland/just-web/tree/main/tools/repo-scripts
[@just-web/routes]: https://github.com/justland/just-web/tree/main/plugins/routes
[@just-web/states]: https://github.com/justland/just-web/tree/main/libraries/states
[Axios]: https://axios-http.com/
[cross-fetch]: https://www.npmjs.com/package/cross-fetch
[downloads-image]: https://img.shields.io/npm/dm/@just-web/app.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-web/app
[MobX]: https://mobx.js.org/
[npm-image]: https://img.shields.io/npm/v/@just-web/app.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-web/app
[React]: https://reactjs.org/
[Redux]: https://redux.js.org/
[SolidJS]: https://www.solidjs.com/
[Svelte]: https://svelte.dev/
[Vue.js]: https://vuejs.org/
