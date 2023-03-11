import { LogOptions, logTestPlugin } from '@just-web/log'
import { logMatchSome } from '@just-web/testing'
import { EventEmitterLike } from '@unional/events-plus'
import { EventEmitter } from 'node:events'
import eventsPlugin, { EventsOptions, justEvent } from './index.js'

function setupPlugin<E extends EventEmitterLike>(options?: LogOptions & EventsOptions<E>) {
	const [l] = logTestPlugin(options).init()
	const [e] = eventsPlugin().init(l)
	return [{ ...l, ...e }]
}

it('can be used with `justEvent.listenTo|emitBy` ', () => {
	const [{ events, log }] = setupPlugin()
	const someEvent = justEvent('some-event')
	someEvent.listenTo(events.emitter, () => log.info('triggered'))
	someEvent.emitBy(events.emitter)

	expect(log.reporter.getLogMessages()).toEqual(['triggered'])
})

it('can be used with `justEvent` and `addListener|emit`', () => {
	const [{ events, log }] = setupPlugin()
	const someEvent = justEvent('some-event')
	events.emitter.addListener(someEvent.type, () => log.info('triggered'))
	events.emitter.emit(someEvent.type)

	expect(log.reporter.getLogMessages()).toEqual(['triggered'])
})

it('can be used with `justEvent.defaultListener`', () => {
	const [{ events, log }] = setupPlugin()
	const someEvent = justEvent('some-event', (value: number) => log.info('triggered', value))
	events.emitter.addListener(someEvent.type, someEvent.defaultListener)
	events.emitter.emit(someEvent.type, ...someEvent(3))

	expect(log.reporter.getLogMessages()).toEqual(['triggered 3'])
})

it('traps error created by listener', () => {
	const [{ events, log }] = setupPlugin()
	events.emitter.addListener('event', () => {
		throw new Error('from listener')
	})
	events.emitter.emit('event')

	logMatchSome(log.reporter, '(ERROR) Error: from listener')
})

it('can use a different event emitter', () => {
	const [{ events }] = setupPlugin({ events: { emitter: new EventEmitter() } })
	let called = false
	events.emitter.addListener('event', () => (called = true))
	events.emitter.emit('event')
	expect(called).toBe(true)
})
