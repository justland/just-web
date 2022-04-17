import { configForTest, logLevels, MemoryLogReporter } from 'standard-log'
import { createLogContext, createTestLogContext } from '.'

describe('createLogContext()', () => {
  let reporter: MemoryLogReporter
  beforeEach(() => reporter = configForTest(logLevels.all).reporter)
  test('emit trace message', () => {
    createLogContext()

    expect(reporter.getLogMessageWithLevel()).toEqual('(TRACE) create log context')
  })
})

describe('createTestLogContext()', () => {
  test('returns memory reporter', () => {
    const { log } = createTestLogContext({ logLevel: logLevels.all })

    expect(log.reporter.getLogMessageWithLevel()).toEqual('(TRACE) create test log context')
  })
})
