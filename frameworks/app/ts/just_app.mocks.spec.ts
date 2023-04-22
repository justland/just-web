import { a, has } from 'assertron'
import { justTestApp } from './just_app.mocks.js'

it('can be called without param', () => {
	justTestApp()
})

it('provides log.reporter', async () => {
	const { log } = await justTestApp().create()
	expect(log.reporter).toBeDefined()
})

it('can use emitLog to send log to console', async () => {
	const { log } = await justTestApp({ log: { emitLog: true } }).create()
	log.info('expected log emitted to console')
	a.satisfies(log.reporter.getLogMessages(), has('expected log emitted to console'))
})
