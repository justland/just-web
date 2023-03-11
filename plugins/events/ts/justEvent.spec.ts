import { logTestPlugin } from '@just-web/log'
import eventsPlugin, { justEvent } from './index.js'

it('can create just event', () => {
	const addEvent = justEvent('add')
	const [ctx] = logTestPlugin().init()
	const [{ events }] = eventsPlugin().init(ctx)

	let called = false
	addEvent.listenTo(events.emitter, () => (called = true))
	addEvent.emitBy(events.emitter)

	expect(called).toBe(true)
})
