import { createMemoryLogReporter, LogContext, LogMethodNames } from '@just-web/log'
import osPlugin, { OSContext } from '@just-web/os'
import { definePlugin, StartContextBase } from '@just-web/types'
import { a } from 'assertron'
import { CanAssign, isType } from 'type-plus'
import { createApp, createTestApp } from './createApp'

describe(createApp.name, () => {
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
    const app = createApp({ name: 'test-app' })
      .extend(osPlugin())

    isType.t<CanAssign<typeof app, OSContext>>()
    expect(app.os.isMac).toBeDefined()
  })

  it('returns itself if the plugin has no PluginContext', () => {
    const app = createApp({ name: 'test-app' })
    const app2 = app.extend({ name: 'dummy', init: () => { } })

    isType.equal<true, typeof app, typeof app2>()
  })
  it('starts will log an app start message', async () => {
    const reporter = createMemoryLogReporter()
    const app = createApp({ name: 'test-app', log: { reporters: [reporter] } })
    await app.start()

    expect(reporter.getLogMessagesWithIdAndLevel()).toEqual([
      'test-app (INFO) start',
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
          log.info('start')
        }
      }))())
    await app.start()

    expect(reporter.getLogMessagesWithIdAndLevel()).toEqual([
      'test-app:dummy-plugin (INFO) start',
      'test-app (INFO) start',
    ])
  })

  it('call both plugins when start', async () => {
    const reporter = createMemoryLogReporter()
    const app = createApp({ name: 'test-app', log: { reporters: [reporter] } })
      .extend(definePlugin(() => ({
        name: 'dummy-a', init() { return [undefined, { a: 1 }] },
        async start({ log }) { log.info('start') }
      }))())
      .extend(definePlugin(() => ({
        name: 'dummy-b', init() { },
        async start({ log }) { log.info('start') }
      }))())
    await app.start()

    expect(reporter.getLogMessagesWithIdAndLevel()).toEqual([
      'test-app:dummy-a (INFO) start',
      'test-app:dummy-b (INFO) start',
      'test-app (INFO) start',
    ])
  })

  it('calls plugin tree', async () => {
    const reporter = createMemoryLogReporter()
    const app = createApp({ name: 'test-app', log: { reporters: [reporter] } })

    app.extend(definePlugin(() => ({
      name: 'dummy-a', init() { },
      async start({ log }) { log.info('start') }
    }))()).extend(definePlugin(() => ({
      name: 'dummy-b', init() { },
      async start({ log }) { log.info('start') }
    }))())

    app.extend(definePlugin(() => ({
      name: 'dummy-c', init() { },
      async start({ log }) {
        log.info('start')
      }
    }))())

    app.extend(definePlugin(() => ({
      name: 'dummy-d', init() { },
      async start({ log }) { log.info('start') }
    }))()).extend(definePlugin(() => ({
      name: 'dummy-e', init() { },
      async start({ log }) { log.info('start') }
    }))())

    await app.start()

    expect(reporter.getLogMessagesWithIdAndLevel()).toEqual([
      'test-app:dummy-a (INFO) start',
      'test-app:dummy-b (INFO) start',
      'test-app:dummy-c (INFO) start',
      'test-app:dummy-d (INFO) start',
      'test-app:dummy-e (INFO) start',
      'test-app (INFO) start',
    ])
  })

  it('only calls `start()` of each plugin once', async () => {
    const reporter = createMemoryLogReporter()
    const app = createApp({ name: 'test-app', log: { reporters: [reporter] } })

    const app2 = app.extend(definePlugin(() => ({
      name: 'dummy-a', init() { },
      async start({ log }) { log.info('start') }
    }))()).extend(definePlugin(() => ({
      name: 'dummy-b', init() { },
      async start({ log }) { log.info('start') }
    }))())

    const app3 = app.extend(definePlugin(() => ({
      name: 'dummy-c', init() { },
      async start({ log }) {
        log.info('start')
      }
    }))())

    const app4 = app.extend(definePlugin(() => ({
      name: 'dummy-d', init() { },
      async start({ log }) { log.info('start') }
    }))()).extend(definePlugin(() => ({
      name: 'dummy-e', init() { },
      async start({ log }) { log.info('start') }
    }))())

    await app.start()
    await app2.start()
    await app3.start()
    await app4.start()

    expect(reporter.getLogMessagesWithIdAndLevel()).toEqual([
      'test-app:dummy-a (INFO) start',
      'test-app:dummy-b (INFO) start',
      'test-app:dummy-c (INFO) start',
      'test-app:dummy-d (INFO) start',
      'test-app:dummy-e (INFO) start',
      'test-app (INFO) start',
    ])
  })

  it('sends startContext to start()', async () => {
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
})

describe(createTestApp.name, () => {
  it('can be called without param', () => {
    createTestApp()
  })

  it('provides log.reporter', () => {
    const app = createTestApp()
    app.log.info('hello')
    expect(app.log.reporter.getLogMessagesWithIdAndLevel()).toEqual(['test-app (INFO) hello'])
  })
})

// TODO: move these to devDeps
// "@just-web/browser": "workspace:*",
// "@just-web/browser-contributions": "workspace:*",
// "@just-web/commands": "workspace:*",
// "@just-web/contributions": "workspace:*",
// "@just-web/os": "workspace:*",
// "@just-web/states": "workspace:*",
