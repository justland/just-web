import { createMemoryLogReporter, LogContext, LogMethodNames } from '@just-web/log'
import osPlugin, { OSContext } from '@just-web/os'
import { definePlugin, StartContextBase } from '@just-web/types'
import { a } from 'assertron'
import { CanAssign, isType } from 'type-plus'
import { createApp2 } from './createApp2'

describe(createApp2.name, () => {
  it('needs name', () => {
    const app = createApp2({ name: 'some app' })

    expect(app.name).toEqual('some app')
  })

  it('generates an 15 chars long app id', () => {
    const app = createApp2({ name: 'test' })

    expect(app.id.length).toEqual(15)
  })

  it('comes with log', () => {
    const app = createApp2({ name: 'test' })

    isType.t<CanAssign<typeof app, LogContext<LogMethodNames>>>()
  })

  it('the log id is the app name', () => {
    const reporter = createMemoryLogReporter()
    const app = createApp2({ name: 'test-app', log: { reporters: [reporter] } })
    app.log.info('hello')

    a.satisfies(reporter.logs, [{ id: 'test-app', args: ['hello'] }])
  })

  it('adds the PluginContext of the plugin to the app', () => {
    const app = createApp2({ name: 'test-app' })
      .extend(osPlugin())

    isType.t<CanAssign<typeof app, OSContext>>()
    expect(app.os.isMac).toBeDefined()
  })

  it('returns itself if the plugin has no PluginContext', () => {
    const app = createApp2({ name: 'test-app' })
    const app2 = app.extend({ name: 'dummy', init: () => { } })

    isType.equal<true, typeof app, typeof app2>()
  })
  it('starts will log an app start message', async () => {
    const reporter = createMemoryLogReporter()
    const app = createApp2({ name: 'test-app', log: { reporters: [reporter] } })
    await app.start()

    expect(reporter.getLogMessagesWithIdAndLevel()).toEqual([
      'test-app (INFO) start',
    ])
  })

  it('starts will call plugin start with an adjusted log', async () => {
    const reporter = createMemoryLogReporter()
    const app = createApp2({ name: 'test-app', log: { reporters: [reporter] } })
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

  it.skip('call both plugins when start', async () => {
    const reporter = createMemoryLogReporter()
    const app = createApp2({ name: 'test-app', log: { reporters: [reporter] } })
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

  it.todo('start() can only be called once, from any of the exteneded app or the app itself')
})


// TODO: move these to devDeps
// "@just-web/browser": "workspace:*",
// "@just-web/browser-contributions": "workspace:*",
// "@just-web/commands": "workspace:*",
// "@just-web/contributions": "workspace:*",
// "@just-web/os": "workspace:*",
// "@just-web/states": "workspace:*",
