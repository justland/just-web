import { createMemoryLogReporter, logLevels } from 'standard-log'
import plugin, { createLogContext, createTestLogContext } from './index'

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

describe(`plugin.${plugin.init.name}()`, () => {
  it('provides app log methods', () => {
    const reporter = createMemoryLogReporter()
    const [ctx] = plugin.init({
      name: 'test-app',
      options: { log: { logLevel: logLevels.all, reporters: [reporter] } }
    })
    ctx.log.alert('alert')
    ctx.log.count('count')
    ctx.log.count('count')
    ctx.log.critical('critical')
    ctx.log.debug('debug')
    ctx.log.emergency('emergency')
    ctx.log.error('error')
    ctx.log.info('info')
    ctx.log.notice('notice')
    ctx.log.planck('planck')
    ctx.log.on(logLevels.error, log => log('on error'))

    expect(reporter.logs
      .filter(l => l.id === 'test-app')
      .map(l => `${ctx.log.toLogLevelName(l.level)}: ${l.args}`)).toEqual([
        'alert: alert',
        'debug: 1,count',
        'debug: 2,count',
        'critical: critical',
        'debug: debug',
        'emergency: emergency',
        'error: error',
        'info: info',
        'notice: notice',
        'planck: planck',
        'error: on error'
      ])
  })

  it('can add custom levels', () => {
    const reporter = createMemoryLogReporter()
    const [ctx] = plugin.init({
      name: 'test-app',
      options: { log: { customLevels: { silly: 500, spicy: 50 }, reporters: [reporter] } }
    })

    const l = ctx.log.getLogger('test logger')
    l.spicy(`it's spicy`)
    l.silly(`what's up`)

    expect(reporter.logs
      .filter(l => l.id === 'test-app:test logger')
      .map(l => `${ctx.log.toLogLevelName(l.level)}: ${l.args}`))
      .toEqual([
        `spicy: it's spicy`,
        `silly: what's up`
      ])
  })
})

describe(`plugins.${plugin.initForTest.name}()`, () => {
  it('logs everything and provides memory reporter', () => {
    const [{ log }] = plugin.initForTest()

    expect(log.logLevel).toEqual(logLevels.all)
    log.info('hello')
    expect(log.reporter.getLogMessages()).toEqual([
      'initForTest',
      'hello'
    ])
  })
})
