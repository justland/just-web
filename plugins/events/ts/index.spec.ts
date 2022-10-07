import { LogOptions, logTestPlugin } from '@just-web/log'
import { logMatchSome } from '@just-web/testing'
import { EventEmitterLike } from '@unional/events-plus'
import { EventEmitter } from 'node:events'
import eventsPlugin, { EventsOptions, justEvent } from '.'

function setupPlugin<E extends EventEmitterLike>(options?: LogOptions & EventsOptions<E>) {
  const [l] = logTestPlugin(options).init()
  const [e] = eventsPlugin().init(l)
  return [{ ...l, ...e }]
}

it('can be used with `justEvent.listenTo|emitBy` ', () => {
  const [{ emitter, log }] = setupPlugin()
  const someEvent = justEvent('some-event')
  someEvent.listenTo(emitter, () => log.info('triggered'))
  someEvent.emitBy(emitter)

  expect(log.reporter.getLogMessages()).toEqual([
    'triggered'
  ])
})


it('can be used with `justEvent` and `addListener|emit`', () => {
  const [{ emitter, log }] = setupPlugin()
  const someEvent = justEvent('some-event')
  emitter.addListener(someEvent.type, () => log.info('triggered'))
  emitter.emit(someEvent.type)

  expect(log.reporter.getLogMessages()).toEqual([
    'triggered'
  ])
})

it('can be used with `justEvent.defaultListener`', () => {
  const [{ emitter, log }] = setupPlugin()
  const someEvent = justEvent('some-event', (value: number) => log.info('triggered', value))
  emitter.addListener(someEvent.type, someEvent.defaultListener)
  emitter.emit(someEvent.type, ...someEvent(3))

  expect(log.reporter.getLogMessages()).toEqual([
    'triggered 3'
  ])
})

it('traps error created by listener', () => {
  const [{ emitter, log }] = setupPlugin()
  emitter.addListener('event', () => { throw new Error('from listener') })
  emitter.emit('event')

  logMatchSome(log.reporter, '(ERROR) Error: from listener')
})

it('can use a different event emitter', () => {
  const [{ emitter }] = setupPlugin({ emitter: new EventEmitter() })
  let called = false
  emitter.addListener('event', () => called = true)
  emitter.emit('event')
  expect(called).toBe(true)
})
