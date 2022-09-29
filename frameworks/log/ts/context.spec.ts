import { createMemoryLogReporter, logLevels } from 'standard-log'
import { createLogContext, createTestLogContext } from '.'

describe('createLogContext()', () => {
  test('emit trace message', () => {
    const reporter = createMemoryLogReporter()
    createLogContext({ name: 'test-app', options: { log: { logLevel: logLevels.all, reporters: [reporter] } } })

    expect(reporter.getLogMessageWithLevel()).toEqual('(TRACE) create log context')
  })
})

describe('createTestLogContext()', () => {
  test('returns memory reporter', () => {
    const { reporter } = createTestLogContext(undefined, { logLevel: logLevels.all })

    expect(reporter.getLogMessageWithLevel()).toEqual('(TRACE) create test log context')
  })
})
