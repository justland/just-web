import { createTestLogContext } from '@just-web/log'
import { logMatchSome } from '@just-web/testing'
import { EventEmitter } from 'node:events'
import { createEventsContext } from '.'


it('traps error created by listener', () => {
  const logContext = createTestLogContext()
  const { emitter } = createEventsContext({ logContext })
  emitter.addListener('event', () => { throw new Error('from listener') })
  emitter.emit('event')

  logMatchSome(logContext.reporter, '(ERROR) Error: from listener')
})

it('can specify to use a different event emitter', () => {
  const logContext = createTestLogContext()
  const { emitter } = createEventsContext({ logContext, emitter: new EventEmitter() })
  let called = false
  emitter.addListener('event', () => called = true)
  emitter.emit('event')
  expect(called).toBe(true)
})
