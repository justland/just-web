import { logTestPlugin, TestLogContext } from '@just-web/log'
import { isType } from 'type-plus'
import { logEqual, logMatchSome } from './log'

let ctx: TestLogContext
beforeEach(() => ctx = logTestPlugin().init()[0])

describe('logEqual()', () => {
  test('require at least one line of expected message', () => {
    logEqual(ctx.log.reporter, '')
    isType.equal<true, string, Parameters<typeof logEqual>[1]>()
  })
})

describe('logMatchSome()', () => {
  test('match one', () => {
    const log = ctx.log.getLogger('match one')
    log.info('first')
    log.info('second')
    log.info('third')
    logMatchSome(ctx.log.reporter, '(INFO) second')
  })
  test('match multiple', () => {
    const log = ctx.log.getLogger('match multi')
    log.info('first')
    log.info('second')
    log.info('third')
    logMatchSome(ctx.log.reporter, '(INFO) second', '(INFO) third')
  })
})
