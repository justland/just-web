import { createMemoryLogReporter, logLevels } from 'standard-log'
import { createLogContext, createTestLogContext, initialize, initializeForTest } from '.'

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

describe(initialize.name, () => {
  it('exposes `log` in the PluginContext', async () => {
    const [logContext] = await initialize({ name: 'test-app' })
    logContext.log.getLogger('test logger')
  })

  it('can configure log options', async () => {
    const [ctx] = await initialize({ name: 'test-app', options: { log: { logLevel: logLevels.all } } })
    expect(ctx.log.logLevel).toEqual(logLevels.all)
  })
})

describe(initializeForTest.name, () => {
  it('exposes reporter', async () => {
    const [ctx] = await initializeForTest()

    expect(ctx.log.reporter).toBeDefined()
  })
})
