# @just-web/log

`@just-web` logging module.

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
  ctx.log.onAdd(log => doSomethingWithTheLogEntry(log))

  app.log.onAdd(log => doSomethingWithTheLogEntry(log))

  // TBD
  app.log.config(options)
  app.start({ log: logOptions })
}
```

## TODO

🔍 add `RemoteReporter` to send logs to a service
🔍
🔍 should `register.keys()` returns an iterator instead of array?
🔍 should `register` adds `values()` that returns an iterator?
🔍 should `register.list()` renamed to `values()` and returns an iterator?
