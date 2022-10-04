import { createMemoryLogReporter, logLevels } from 'standard-log'
import plugin, { logTestPlugin } from './index'

describe(`plugin().init()`, () => {
  it('provides app log methods', () => {
    const reporter = createMemoryLogReporter()
    const [ctx] = plugin({ logLevel: logLevels.all, reporters: [reporter] })
      .init({ name: 'test-app', id: '' })
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
    const [ctx] = plugin({ customLevels: { silly: 500, spicy: 50 }, reporters: [reporter] })
      .init({ name: 'test-app', id: '' })

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

describe(`${logTestPlugin.name}().init()`, () => {
  it('defaults logLevel to debug and provides memory reporter', () => {
    const [{ log }] = logTestPlugin().init()

    expect(log.logLevel).toEqual(logLevels.debug)
    log.info('hello')
    expect(log.reporter.getLogMessages()).toEqual([
      'hello'
    ])
  })
})
