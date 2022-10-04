import { logTestPlugin } from '@just-web/log'
import { logMatchSome } from '@just-web/testing'
import { EventEmitter } from 'node:events'
import eventsPlugin from '.'

it('traps error created by listener', () => {
  const [ctx] = logTestPlugin().init()
  const [{ emitter }] = eventsPlugin().init(ctx)
  emitter.addListener('event', () => { throw new Error('from listener') })
  emitter.emit('event')

  logMatchSome(ctx.log.reporter, '(ERROR) Error: from listener')
})

it('can specify to use a different event emitter', () => {
  const [ctx] = logTestPlugin().init()
  const [{ emitter }] = eventsPlugin().init({ ...ctx, options: { emitter: new EventEmitter() } })
  let called = false
  emitter.addListener('event', () => called = true)
  emitter.emit('event')
  expect(called).toBe(true)
})
