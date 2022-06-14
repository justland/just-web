import { createTestLogContext, TestLogContext } from '@just-web/log'
import { isType } from 'type-plus'
import { logEqual, logMatchSome } from './log'

let ctx: TestLogContext
beforeEach(() => ctx = createTestLogContext())

describe('logEqual()', () => {
  test('require at least one line of expected message', () => {
    logEqual(ctx.reporter, '')
    isType.equal<true, string, Parameters<typeof logEqual>[1]>()
  })
})

describe('logMatchSome()', () => {
  test('match one', () => {
    const log = ctx.getLogger('match one')
    log.info('first')
    log.info('second')
    log.info('third')
    logMatchSome(ctx.reporter, '(INFO) second')
  })
  test('match multiple', () => {
    const log = ctx.getLogger('match multi')
    log.info('first')
    log.info('second')
    log.info('third')
    logMatchSome(ctx.reporter, '(INFO) second', '(INFO) third')
  })
})
