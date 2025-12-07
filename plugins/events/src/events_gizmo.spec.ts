import { EventEmitter } from 'node:events'
import { justTestApp } from '@just-web/app/testing'
import { a, some } from 'assertron'
import { expect, it } from 'vitest'
import { eventsGizmoFn, justEvent } from './index.js'

it('by default uses `EventEmitter3`', async () => {
	const app = await justTestApp().with(eventsGizmoFn()).create()

	expect.assertions(1)
	app.events.emitter.once('some.event', () => expect('called').toBe('called'))
	app.events.emitter.emit('some.event')
})

it('can use a different event emitter', async () => {
	const app = await justTestApp()
		.with(eventsGizmoFn({ emitter: new EventEmitter() }))
		.create()

	expect.assertions(1)
	app.events.emitter.once('some.event', () => expect('called').toBe('called'))
	app.events.emitter.emit('some.event')
})

it('can be used with `justEvent.listenTo|emitBy` ', async () => {
	const { events, log } = await justTestApp().with(eventsGizmoFn()).create()

	const someEvent = justEvent('some-event')
	someEvent.listenTo(events.emitter, () => log.info('triggered'))
	someEvent.emitBy(events.emitter)

	a.satisfies(log.reporter.getLogMessages(), some('triggered'))
})

it('can be used with `justEvent` and `addListener|emit`', async () => {
	const { events, log } = await justTestApp().with(eventsGizmoFn()).create()
	const someEvent = justEvent('some-event')
	events.emitter.addListener(someEvent.type, () => log.info('triggered'))
	events.emitter.emit(someEvent.type)

	a.satisfies(log.reporter.getLogMessages(), some('triggered'))
})

it('can be used with `justEvent.defaultListener`', async () => {
	const { events, log } = await justTestApp().with(eventsGizmoFn()).create()

	const someEvent = justEvent('some-event', (value: number) => log.info('triggered', value))
	events.emitter.addListener(someEvent.type, someEvent.defaultListener)
	events.emitter.emit(someEvent.type, ...someEvent(3))

	a.satisfies(log.reporter.getLogMessages(), some('triggered 3'))
})

it('traps error created by listener', async () => {
	const { events, log } = await justTestApp().with(eventsGizmoFn()).create()
	events.emitter.addListener('event', () => {
		throw new Error('from listener')
	})
	events.emitter.emit('event')

	a.satisfies(log.reporter.getLogMessages(), some(/^Error: from listener/))
})
