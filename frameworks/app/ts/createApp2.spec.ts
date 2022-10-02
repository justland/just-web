import { createMemoryLogReporter, LogContext, LogMethodNames } from '@just-web/log'
import osPlugin, { OSContext } from '@just-web/os'
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

  // it('returns itself if the plugin has no PluginContext', () => {
  //   const app = createApp2({ name: 'test-app' })
  //     .extend(browserPlugin())
  // })

  it.todo('start()')
})


// TODO: move these to devDeps
// "@just-web/browser": "workspace:*",
// "@just-web/browser-contributions": "workspace:*",
// "@just-web/commands": "workspace:*",
// "@just-web/contributions": "workspace:*",
// "@just-web/os": "workspace:*",
// "@just-web/states": "workspace:*",
