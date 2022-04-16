import { configForTest, getLogger, MemoryLogReporter } from '@just-web/log'
import { isType } from 'type-plus'
import { logEqual, logMatchSome } from './log'

let reporter: MemoryLogReporter
beforeEach(() => reporter = configForTest().reporter)

describe('logEqual()', () => {
  test('require at least one line of expected message', () => {
    logEqual(reporter, '')
    isType.equal<true, string, Parameters<typeof logEqual>[1]>()
  })
})

describe('logMatchSome()', () => {
  test('match one', () => {
    const log = getLogger('match one')
    log.info('first')
    log.info('second')
    log.info('third')
    logMatchSome(reporter, '(INFO) second')
  })
  test('match multiple', () => {
    const log = getLogger('match multi')
    log.info('first')
    log.info('second')
    log.info('third')
    logMatchSome(reporter, '(INFO) second', '(INFO) third')
  })
})
