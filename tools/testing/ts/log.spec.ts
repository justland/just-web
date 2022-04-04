import { createMemoryLogReporter } from '@just-web/log'
import { isType } from 'type-plus'
import { assertLog } from './log'

describe('assertLog()', () => {
  test('require at least one line of expected message', () => {
    const reporter = createMemoryLogReporter()
    assertLog(reporter, '')
    isType.equal<true, string, Parameters<typeof assertLog>[1]>()
  })
})
