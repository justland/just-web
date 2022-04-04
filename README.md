# just-web

`@just-web` is a UI library agnostic web application framework.

You can use it to build web application using technology of your choice: `React`, `SolidJS`, `redux`, `mobx` etc.

This repository is setup as a monorepo containing applications in `@justland` using `@just-web`.

They serve as direct consumers of `@just-web` to drive the implementation.

- [`@just-func/play-react`](just-func/play-react/README.md): `just-func` playground written with `React`.
- [`@just-func/play-solid`](just-func/play-solid/README.md): `just-func` playground written with `SolidJS`.

## modules

Here are a short summary about each module inside `@just-web`:

Framework modules:

- [`@just-web/app`](frameworks/app/README.md): entry point of `@just-web` application framework.
- [`@just-web/commands`](frameworks/commands/README.md): manages commands throughout the application.
- [`@just-web/contexts`](frameworks/contexts/README.md): provides application contexts to components and plugins.
- [`@just-web/contributions`](frameworks/contributes/README.md): manages application and plugins capabilities.
- [`@just-web/errors`](frameworks/errors/README.md): centralized error capture and reporting module.
- [`@just-web/format`](frameworks/format/README.md): formatting values to pass between the app and external systems.
- [`@just-web/log`](frameworks/log/README.md): logging module.
- [`@just-web/platform`](frameworks/platform/README.md): interface to the platfrom running the application.
- [`@just-web/plugins`](frameworks/plugins/README.md): provide API for `@just-web` plugins
- [`@just-web/routes`](frameworks/routes/README.md): routing module for SPA, MPA, and external application/services.
- [`@just-web/states`](frameworks/states/README.md): state management module.

Component modules:

- [`@just-web/react-commands`](components/react-commands/README.md): React components to the `@just-web/commands` module.

Tooling:

- [`@just-web/testing`](tools/testing/README.md): testing utility module.

## Contribute

Please check out the [contributing guide](./CONTRIBUTING.md)
