import { idTestGizmoFn } from '@just-web/id/testing'
import { incubate } from '@unional/gizmo'
import { logTestGizmoFn } from './log_gizmo.mocks.js'
import { createPrefixedGetLogger } from './logger.js'

it('prefix logger id', async () => {
	const { log } = await incubate()
		.with(idTestGizmoFn())
		.with(logTestGizmoFn())
		.create()

	const getLogger = createPrefixedGetLogger({ log }, 'some-plugin')
	const r = getLogger('some-logger')
	r.notice('hello')

	expect(log.reporter.getLogMessagesWithIdAndLevel()).toEqual(['test:some-plugin:some-logger (NOTICE) hello'])
})

it('gets `app:prefix` as logger id when given empty id', async () => {
	const { log } = await incubate()
		.with(idTestGizmoFn())
		.with(logTestGizmoFn())
		.create()

	const getLogger = createPrefixedGetLogger({ log }, 'some-plugin')
	const r = getLogger('')
	r.notice('hello')

	expect(log.reporter.getLogMessagesWithIdAndLevel()).toEqual(['test:some-plugin (NOTICE) hello'])
})
