import {
  configForTest, getLogger, logLevels, MemoryLogReporter
} from '.'

let reporter: MemoryLogReporter

beforeEach(() => {
  reporter = configForTest(logLevels.debug).reporter
})

test('log testing', () => {
  const log = getLogger('test')
  log.warn('some warnings')

  expect(reporter.getLogMessageWithLevel()).toEqual('(WARN) some warnings')
})
