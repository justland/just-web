import { idGizmoFn } from '@just-web/id'
import { incubate } from '@unional/gizmo'
import { createMemoryLogReporter, logLevels } from 'standard-log'
import { logTestGizmo } from './log_gizmo.mocks.js'

it('defaults logLevel to debug and provides memory reporter', async () => {
	const { log } = await incubate()
		.with(idGizmoFn({ name: 'test-app' }))
		.with(logTestGizmo())
		.create()

	expect(log.logLevel).toEqual(logLevels.debug)
	log.info('hello')
	expect(log.reporter.getLogMessages()).toEqual(['hello'])
})

it('works with app name', async () => {
	const { log } = await incubate()
		.with(idGizmoFn({ name: 'some-app' }))
		.with(logTestGizmo())
		.create()
	log.notice('hello')

	expect(log.reporter.getLogMessagesWithIdAndLevel()).toEqual(['some-app (NOTICE) hello'])
})

it('uses reporter from options if specified', async () => {
	const r = createMemoryLogReporter()
	const { log } = await incubate()
		.with(idGizmoFn({ name: 'test' }))
		.with(logTestGizmo({ reporters: [r] }))
		.create()

	log.notice('hello')

	expect(log.reporter).toEqual(r)
	expect(log.reporter.getLogMessagesWithIdAndLevel()).toEqual(['test (NOTICE) hello'])
})
