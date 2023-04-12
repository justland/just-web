import { incubate } from '@unional/gizmo'
import { createMemoryLogReporter, logLevels } from 'standard-log'
import { appGizmo } from './app_gizmo.js'
import { logTestGizmo } from './log_gizmo.mocks.js'

it('defaults logLevel to debug and provides memory reporter', async () => {
	const { log } = await incubate()
		.with(appGizmo({ name: 'test-app' }))
		.with(logTestGizmo())
		.create()

	expect(log.logLevel).toEqual(logLevels.debug)
	log.info('hello')
	expect(log.reporter.getLogMessages()).toEqual(['hello'])
})

it('works with app name', async () => {
	const { log } = await incubate()
		.with(appGizmo({ name: 'some-app' }))
		.with(logTestGizmo())
		.create()
	log.notice('hello')

	expect(log.reporter.getLogMessagesWithIdAndLevel()).toEqual(['some-app (NOTICE) hello'])
})

it('works with additional reporters', async () => {
	const r = createMemoryLogReporter()
	const { log } = await incubate()
		.with(appGizmo({ name: 'test' }))
		.with(logTestGizmo({ log: { reporters: [r] } }))
		.create()

	log.notice('hello')

	// the build-in one will not be used
	expect(log.reporter.logs).toEqual([])

	expect(r.getLogMessagesWithIdAndLevel()).toEqual(['test (NOTICE) hello'])
})
