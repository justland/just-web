import { configForTest, MemoryLogReporter } from '@just-web/log'
import { EventEmitter } from 'node:events'
import { logMatchSome } from '@just-web/testing'
import { createEventsContext } from './eventsContext'

let reporter: MemoryLogReporter
beforeAll(() => reporter = configForTest().reporter)

it('traps error created by listener', () => {
  const { emitter } = createEventsContext()
  emitter.addListener('event', () => { throw new Error('from listener') })
  emitter.emit('event')

  logMatchSome(reporter, '(ERROR) Error: from listener')
})

it('can specify to use a different event emitter', () => {
  const { emitter } = createEventsContext({ emitter: new EventEmitter() })
  let called = false
  emitter.addListener('event', () => called = true)
  emitter.emit('event')
  expect(called).toBe(true)
})
