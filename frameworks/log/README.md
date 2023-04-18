# @just-web/log

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[@just-web/log] provides logging capability to a [just-web] application.

It is build on top of [standard-log] which supports customization with runtime protection,
sanitization, remote reporting, log level control, etc.

This is part of the core [just-web] framework.
Every [just-web] application uses [`LogGizmo`] to provide logging capability.

You normally would not use this package directly,
but instead use the [@just-web/app](../app/README.md) package.

## Usage

```ts
import { justApp } from '@just-web/app'

const app = await justApp({ name: 'my-app' }).create()

// emits log message to console
app.log.info('some log message')
```

You can customize it behavior by providing the `log` option when creating the application:

```ts
const app = await justApp({
  name: 'my-app',
  log: {
    // define the log level (default: `logLevels.info`)
    logLevel: logLevels.all,
    // define reporters to handle the log messages (default: color console reporter)
    reporters: [reporter],
    /// add custom log levels
    customLevels: {
      happy: 500
    }
  }
})

// the `happy()` method will be available
app.log.happy('some log message')
```

You can create a logger with the `getLogger()` method:

```ts
// logger id: `my-app:something`
const log = app.log.getLogger('something')
```

If you do not pass in and id,
you will get the base logger:

```ts
// logger id: `my-app`
const logger = app.log.getLogger()
```

You can also create a "non-console" logger,
which will not emit log message to console.

```ts
const log = app.log.getNonConsoleLogger('something')
```

Besides [`LogGizmo`],
there are also functions re-exported from [standard-log].
For more information, please refer to the [standard-log] documentation.

[`LogGizmo`]: ./ts/log_gizmo.ts
[@just-web/log]: https://github.com/justland/just-web/tree/main/frameworks/log
[downloads-image]: https://img.shields.io/npm/dm/@just-web/log.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-web/log
[npm-image]: https://img.shields.io/npm/v/@just-web/log.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-web/log
[just-web]: https://github.com/justland/just-web
[standard-log]: https://github.com/unional/standard-log
