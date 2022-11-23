import { createMemoryLogReporter, LogContext, logLevels, LogMethodNames } from '@just-web/log'
import osPlugin, { OSContext } from '@just-web/os'
import { definePlugin, StartContextBase } from '@just-web/types'
import { a } from 'assertron'
import { some } from 'satisfier'
import { CanAssign, isType } from 'type-plus'
import { createApp, createTestApp } from './createApp.js'

describe(`${createApp.name}()`, () => {
  it('needs name', () => {
    const app = createApp({ name: 'some app' })

    expect(app.name).toEqual('some app')
  })

  it('generates an 15 chars long app id', () => {
    const app = createApp({ name: 'test' })

    expect(app.id.length).toEqual(15)
  })

  it('comes with log', () => {
    const app = createApp({ name: 'test' })

    isType.t<CanAssign<typeof app, LogContext<LogMethodNames>>>()
  })

  it('the log id is the app name', () => {
    const reporter = createMemoryLogReporter()
    const app = createApp({ name: 'test-app', log: { reporters: [reporter] } })
    app.log.info('hello')

    a.satisfies(reporter.logs, [{ id: 'test-app', args: ['hello'] }])
  })

  it('adds the PluginContext of the plugin to the app', () => {
    const app = createApp({ name: 'test-app', log: { logLevel: logLevels.none } })
      .extend(osPlugin())

    isType.t<CanAssign<typeof app, OSContext>>()
    expect(app.os.isMac).toBeDefined()
  })

  it('returns itself if the plugin has no PluginContext', () => {
    const app = createApp({ name: 'test-app', log: { logLevel: logLevels.none } })
    const app2 = app.extend({ name: 'dummy', init: () => { } })

    isType.equal<true, typeof app, typeof app2>()
  })

  it('allows TypeB plugin with partial NeedContext', () => {
    const app = createApp({ name: 'test-app', log: { logLevel: logLevels.none } })
    const app2 = app.extend({ name: 'dummy', init: () => [{ a: 1 }] })
    const app3 = app2.extend({ name: 'dummy', init: (_: { a: number, b?: number }) => { } })

    isType.equal<true, typeof app2, typeof app3>()
  })

  it('allows TypeB plugin with partial NeedContext overriding PluginContext', () => {
    const app = createApp({ name: 'test-app', log: { logLevel: logLevels.none } })
    const b = definePlugin(() => ({ name: 'dummy', init: () => [{ a: 1 }] }))
    const app2 = app.extend(b())
    const b1 = definePlugin(() => ({ name: 'dummy', init: (_: { a: number, b?: number }) => [{ a: 'a' }] }))
    const app3 = app2.extend(b1())

    isType.equal<true, string, typeof app3.a>()
    isType.equal<true, typeof app & { a: string }, typeof app3>()
  })

  it('works with TypeD plugin', () => {
    const app = createApp({ name: 'test-app', log: { logLevel: logLevels.none } })
    const d = definePlugin(() => ({ name: 'dummy', init: () => [{ a: 1 }, { s: 1 }], start: () => { } }))
    const app2 = app.extend(d())

    isType.equal<true, number, typeof app2.a>()
    isType.equal<true, typeof app & { a: number }, typeof app2>()
  })

  it('starts will log an app start message', async () => {
    const reporter = createMemoryLogReporter()
    const app = createApp({ name: 'test-app', log: { reporters: [reporter] } })
    await app.start()

    a.satisfies(reporter.getLogMessagesWithIdAndLevel(), [
      /test-app \(INFO\) starting \(id: .*\)/,
    ])
  })

  it('starts will call plugin start with an adjusted log', async () => {
    const reporter = createMemoryLogReporter()
    const app = createApp({ name: 'test-app', log: { reporters: [reporter] } })
      .extend(definePlugin(() => ({
        name: 'dummy-plugin',
        init() { },
        // Have to declare the type here.
        // Seems to be a TypeScript bug (4.8.4)
        async start({ log }: StartContextBase) {
          isType.equal<false, any, typeof log>()
          log.info('inside plugin')
        }
      }))())
    await app.start()

    a.satisfies(reporter.getLogMessagesWithIdAndLevel(), [
      'test-app (NOTICE) initializing dummy-plugin',
      'test-app (NOTICE) starting dummy-plugin',
      'test-app:dummy-plugin (INFO) inside plugin',
      /test-app \(INFO\) starting \(id: .*\)/,
    ])
  })

  it('call both plugins when start', async () => {
    const reporter = createMemoryLogReporter()
    const app = createApp({ name: 'test-app', log: { reporters: [reporter] } })
      .extend(definePlugin(() => ({
        name: 'dummy-a', init() { return [undefined, { a: 1 }] },
        async start() { }
      }))())
      .extend(definePlugin(() => ({
        name: 'dummy-b', init() { },
        async start() { }
      }))())
    await app.start()

    a.satisfies(reporter.getLogMessagesWithIdAndLevel(), [
      'test-app (NOTICE) initializing dummy-a',
      'test-app (NOTICE) initializing dummy-b',
      'test-app (NOTICE) starting dummy-a',
      'test-app (NOTICE) starting dummy-b',
      /test-app \(INFO\) starting \(id: .*\)/,
    ])
  })

  it('calls plugin tree', async () => {
    const reporter = createMemoryLogReporter()
    const app = createApp({ name: 'test-app', log: { reporters: [reporter] } })

    app.extend(definePlugin(() => ({
      name: 'dummy-a', init() { },
      async start() { }
    }))()).extend(definePlugin(() => ({
      name: 'dummy-b', init() { },
      async start() { }
    }))())

    app.extend(definePlugin(() => ({
      name: 'dummy-c', init() { },
      async start() { }
    }))())

    app.extend(definePlugin(() => ({
      name: 'dummy-d', init() { },
      async start() { }
    }))()).extend(definePlugin(() => ({
      name: 'dummy-e', init() { },
      async start() { }
    }))())

    await app.start()

    a.satisfies(reporter.getLogMessagesWithIdAndLevel(), [
      'test-app (NOTICE) initializing dummy-a',
      'test-app (NOTICE) initializing dummy-b',
      'test-app (NOTICE) initializing dummy-c',
      'test-app (NOTICE) initializing dummy-d',
      'test-app (NOTICE) initializing dummy-e',
      'test-app (NOTICE) starting dummy-a',
      'test-app (NOTICE) starting dummy-b',
      'test-app (NOTICE) starting dummy-c',
      'test-app (NOTICE) starting dummy-d',
      'test-app (NOTICE) starting dummy-e',
      /test-app \(INFO\) starting \(id: .*\)/,
    ])
  })

  it('only calls `start()` of each plugin once', async () => {
    const reporter = createMemoryLogReporter()
    const app = createApp({ name: 'test-app', log: { reporters: [reporter] } })

    const app2 = app.extend(definePlugin(() => ({
      name: 'dummy-a', init() { },
      async start() { }
    }))()).extend(definePlugin(() => ({
      name: 'dummy-b', init() { },
      async start() { }
    }))())

    const app3 = app.extend(definePlugin(() => ({
      name: 'dummy-c', init() { },
      async start() { }
    }))())

    const app4 = app.extend(definePlugin(() => ({
      name: 'dummy-d', init() { },
      async start() { }
    }))()).extend(definePlugin(() => ({
      name: 'dummy-e', init() { },
      async start() { }
    }))())

    await app.start()
    // right now each of this will emit a log
    // need to detect if there are any new plugin down the tree started,
    // to determine if we should emit the extra log
    // and may be good to show which plugins/new plugins have started
    await app2.start()
    await app3.start()
    await app4.start()

    a.satisfies(reporter.getLogMessagesWithIdAndLevel(), [
      'test-app (NOTICE) initializing dummy-a',
      'test-app (NOTICE) initializing dummy-b',
      'test-app (NOTICE) initializing dummy-c',
      'test-app (NOTICE) initializing dummy-d',
      'test-app (NOTICE) initializing dummy-e',
      'test-app (NOTICE) starting dummy-a',
      'test-app (NOTICE) starting dummy-b',
      'test-app (NOTICE) starting dummy-c',
      'test-app (NOTICE) starting dummy-d',
      'test-app (NOTICE) starting dummy-e',
      /test-app \(INFO\) starting \(id: .*\)/,
      /test-app \(INFO\) starting \(id: .*\)/,
      /test-app \(INFO\) starting \(id: .*\)/,
      /test-app \(INFO\) starting \(id: .*\)/,
    ])
  })

  it(`sends startContext to start()`, async () => {
    const reporter = createMemoryLogReporter()
    const app = createApp({ name: 'a', log: { reporters: [reporter] } }).extend(definePlugin(() => ({
      name: 'plugin-a',
      init: () => ([undefined, { b: 1 }]),
      start: (ctx) => {
        isType.t<CanAssign<typeof ctx, { b: number }>>()
        expect(ctx.b).toEqual(1)
      }
    }))())
    await app.start()
  })

  it(`gives plugin a prefixed getLogger()`, async () => {
    const reporter = createMemoryLogReporter()
    const app = createApp({ name: 'a', log: { reporters: [reporter] } }).extend(definePlugin(() => ({
      name: 'plugin-a',
      init: (ctx: LogContext) => {
        const log = ctx.log.getLogger('custom')
        log.info('info')
      }
    }))())
    await app.start()

    a.satisfies(reporter.getLogMessagesWithIdAndLevel(), some(
      'a:plugin-a:custom (INFO) info'
    ))
  })

  it('gives plugin a prefixed getNonConsoleLogger()', async () => {
    const reporter = createMemoryLogReporter()
    const app = createApp({ name: 'a', log: { reporters: [reporter] } }).extend(definePlugin(() => ({
      name: 'plugin-a',
      init: (ctx: LogContext) => {
        const log = ctx.log.getNonConsoleLogger('custom')
        log.info('info')
      }
    }))())
    await app.start()

    a.satisfies(reporter.getLogMessagesWithIdAndLevel(), some(
      'a:plugin-a:custom (INFO) info'
    ))
  })
})

describe(`${createTestApp.name}()`, () => {
  it('can be called without param', () => {
    createTestApp()
  })

  it('provides log.reporter', () => {
    const app = createTestApp()
    app.log.info('hello')
    expect(app.log.reporter.getLogMessagesWithIdAndLevel()).toEqual(['test-app (INFO) hello'])
  })
})
