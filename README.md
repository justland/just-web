# just-web

`@just-web` is a UI library agnostic web application framework.

You can use it to build web application using technology of your choice: `React`, `SolidJS`, `axios`, etc.

This repository is setup as a monorepo containing applications in `@justland` using `@just-web`.

They serve as the direct consumer of `@just-web` and drives the implementation.

- `@just-func/playground-react`: `just-func` playground written with `React`.
- `@just-func/playground-solid`: `just-func` playground written with `SolidJS`.

## modules

Here are a short summary about each module inside `@just-web`:

- [`@just-web/app`](frameworks/app/README.md): entry point of `@just-web` application framework.
- `@just-web/plugin`: provide API for `@just-web` plugins
- [`@just-web/commands`](frameworks/commands/README.md): manages commands throughout the application.
- [`@just-web/contributes`](frameworks/contributes/README.md): manages application and plugins capabilities.
- [`@just-web/errors`](frameworks/errors/README.md): centralized error capture and reporting module.
- [`@just-web/format`](frameworks/format/README.md): formatting values to pass between the app and external systems.
- [`@just-web/platform`](frameworks/platform/README.md): interface to the platfrom running the application.
- [`@just-web/routes`](frameworks/routes/README.md): routing module for SPA, MPA, and external application/services.
- [`@just-web/states`](frameworks/states/README.md): state management module.
- [`@just-web/testing`](tools/testing/README.md): testing utility module.

## Contribute

This repository uses [`rush`](https://rushjs.io/) with [pnpm](https://pnpm.io/).

You need to setup your environment with them to work on this repository.

```sh
# install rush globally
npm install -g @microsoft/rush

# install corepack for Node.js before 14.19.0 and 16.9.0 to use pnpm
npm install -g corepack

# or install pnpm directly
npm install -g pnpm

# enable pnpm with corepack
corepack enable

# setup repository
rush update
```
