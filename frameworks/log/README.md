# @just-web/log

`@just-web` logging module.

## Usage

When trying to write some logs,
reference and use this library directly:

```ts
import { log, getLogger } from '@just-web/log'

function work() {
  log.info('module', 'some log message')

  const myLog = getLogger('module')
  myLog.info('some log message')
}
```

If you want to manipulate or configure the log system,
api is available in `@just-web/contexts` and `@just-web/app`:

```ts
import { getReadonlyContext } from '@just-web/contexts'
import app from `@just-web/app`

function work() {
  const ctx = getReadonlyContext()
  // Not implemented, in design phrase
  ctx.log.onAdd(doSomethingWithTheLogEntry)
  app.log.onAdd(doSomethingWithTheLogEntry)

  // TBD
  app.log.config(options)
  // or
  app.start({ log: logOptions })
}
```

## Responsibilities

- ❌ should not provide any lifecycle management
  - It is handled in `@just-web/app`

## TODO

- 🔍 add `ProxyReporter` to receive new log entries
  - any sanitization before the handlers are called?
- 🔍 add `RemoteReporter` to send logs to a service
