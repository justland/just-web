# @just-web/log

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[`@just-web/log`] provides a consistent logging API to `@just-web` applications.

It supports customization with runtime protection, sanitization, remote reporting, log level control, etc.

This is a core module of `@just-web`.
You do not need to reference this module directly.

The features of this module are exposed through [`@just-web/app`].

## Usage

Import from [`@just-web/app`] to write logs:

```ts
import { log, getLogger } from '@just-web/app'

function work() {
  // ad-hoc logging
  log.info('module', 'some log message')

  // create a custom logger
  const myLog = getLogger('module')
  myLog.info('some log message')
}
```

Configure when creating the application:

```ts
import { createApp } from '@just-web/app'

const app = createApp({
  log: { /* log options */ }
})
```

You can create a logger without an id:

```ts
const log = app.log.getLogger()
```

But creating a non-console logger, the id is required:

```ts
const log = app.log.getNonConsoleLogger('something')
```

This ensure they have different id so their logs can be distinguished.

Please refer to the `handbook` to learn more about it.

[`@just-web/app`]: https://github.com/justland/just-web/tree/main/frameworks/app
[`@just-web/log`]: https://github.com/justland/just-web/tree/main/frameworks/log
[downloads-image]: https://img.shields.io/npm/dm/@just-web/log.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-web/log
[npm-image]: https://img.shields.io/npm/v/@just-web/log.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-web/log
