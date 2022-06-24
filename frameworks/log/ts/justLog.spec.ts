import { createMemoryLogReporter, justLog } from '.'

it('can be created without params', () => {
  const jl = justLog()
  expect(jl).toBeDefined()
})

it('defaults to info', () => {
  const reporter = createMemoryLogReporter()
  const jl = justLog({ reporters: [reporter] })

  jl.error('error')
  jl.info('info')
  jl.debug('debug')
  expect(reporter.logs.length).toBe(2)

  const log = jl.getLogger({ id: 'test' })
  log.error('error')
  log.info('info')
  log.debug('debug')
  expect(reporter.logs.length).toBe(4)
})

it('append app name to logger', () => {
  const reporter = createMemoryLogReporter()
  const jl = justLog({ name: 'app', reporters: [reporter] })
  const log = jl.getLogger({ id: 'test' })
  log.emergency('abc')

  expect(reporter.logs[0].id).toBe(`app:test`)

  jl.warn('warn')
  expect(reporter.logs[1].id).toBe('app:just-web')
})
