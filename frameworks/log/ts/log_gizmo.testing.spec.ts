import { idTestGizmoFn } from '@just-web/id/testing'
import { incubate } from '@unional/gizmo'
import { createMemoryLogReporter, logLevels } from 'standard-log'
import { logTestGizmoFn } from './log_gizmo.testing.js'

it('defaults logLevel to debug and provides memory reporter', async () => {
	const { log } = await incubate().with(idTestGizmoFn()).with(logTestGizmoFn()).create()

	expect(log.logLevel).toEqual(logLevels.debug)
	log.info('hello')
	expect(log.reporter.getLogMessages()).toEqual(['hello'])
})

it('works with app name', async () => {
	const { log } = await incubate().with(idTestGizmoFn()).with(logTestGizmoFn()).create()
	log.notice('hello')

	expect(log.reporter.getLogMessagesWithIdAndLevel()).toEqual(['test (NOTICE) hello'])
})

it('uses reporter from options if specified', async () => {
	const r = createMemoryLogReporter()
	const { log } = await incubate()
		.with(idTestGizmoFn())
		.with(logTestGizmoFn({ reporters: [r] }))
		.create()

	log.notice('hello')

	expect(log.reporter).toEqual(r)
	expect(log.reporter.getLogMessagesWithIdAndLevel()).toEqual(['test (NOTICE) hello'])
})

it('can use emitLog to send log to console', async () => {
	const { log } = await incubate()
		.with(idTestGizmoFn())
		.with(logTestGizmoFn({ emitLog: true }))
		.create()

	log.info('expected log emitted to console')
	expect(log.reporter.getLogMessages()).toEqual(['expected log emitted to console'])
})
