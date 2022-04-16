# @just-web/log

[`@just-web/log`] provides a consistent logging API to `@just-web` applications.

It supports customization with runtime protection, sanitization, remote reporting, log level control, etc.

This is a core module of `@just-web`.
You do not need to reference this module directly.

The features of this module are exposed through [`@just-web/app`] and [`@just-web/context`].

## Usage

Import from [`@just-web/app`] (for application) or [`@just-web/contexts`] (for plugins) to write logs:

```ts
import { log, getLogger } from '@just-web/app' // or `@just-web/contexts`

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

Please refer to the `handbook` to learn more about it.

[`@just-web/app`]: https://github.com/justland/just-web/tree/main/frameworks/app
[`@just-web/contexts`]: https://github.com/justland/just-web/tree/main/frameworks/contexts
[`@just-web/log`]: https://github.com/justland/just-web/tree/main/frameworks/log
