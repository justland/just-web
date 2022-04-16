---
sidebar_position: 1
---

# Type of modules

There are a few kinds of modules:

## Library

Library provides code to be called by other codes.
They do not participate in the lifecycle of an application.

Examples:

- 3rd party libraries
- `@just-web/states`

## Core modules

Core modules participate in the lifecycle of an application.
It provides core features that is required by every application.
It may create global states that is used by the application.

Examples:

- `@just-web/errors`
- `@just-web/commands`

They participate in the lifecycle of an application by providing:

```ts
export function start(options) { }

export function shutdown() { }
```

The application reads the `application manifest` and pass the corresponding `options` to the module.

## Plugins

Plugins are optional modules that is loaded by the application on demand.

They participate in the lifecycle by providing:

Examples:

- `@just-web/react-commands`
- `@just-web/i18n`

```ts
export function activate(context: PluginContext) { ... }

export function deactivate() { ... }
```
