import { createMemoryLogReporter, logLevels } from 'standard-log'
import plugin, { createLogContext, createTestLogContext } from '.'

describe('createLogContext()', () => {
  test('emit trace message', () => {
    const reporter = createMemoryLogReporter()
    createLogContext({ name: 'test-app', options: { log: { logLevel: logLevels.all, reporters: [reporter] } } })

    expect(reporter.getLogMessageWithLevel()).toEqual('(TRACE) create log context')
  })
})

describe('createTestLogContext()', () => {
  test('returns memory reporter', () => {
    const { log: { reporter } } = createTestLogContext(undefined, { log: { logLevel: logLevels.all } })

    expect(reporter.getLogMessageWithLevel()).toEqual('(TRACE) create test log context')
  })
})

describe(`plugin.${plugin.init.name}`, () => {
  it('exposes `log` in the PluginContext', () => {
    const [logContext] = plugin.init({ name: 'test-app', options: { log: { customLevels: { 'silly': 500 } } } })

    const l = logContext.log.getLogger('test logger')
    l.silly(`what's up`)
  })

  it('can configure log options', () => {
    const [ctx] = plugin.init({ name: 'test-app', options: { log: { logLevel: logLevels.all } } })
    expect(ctx.log.logLevel).toEqual(logLevels.all)
  })
})

describe(`plugins.${plugin.initForTest.name}`, () => {
  it('exposes reporter', () => {
    const [ctx] = plugin.initForTest()

    expect(ctx.log.reporter).toBeDefined()
  })
})
