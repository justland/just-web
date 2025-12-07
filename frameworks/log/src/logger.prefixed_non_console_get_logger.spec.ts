import { idTestGizmoFn } from '@just-web/id/testing'
import { incubate } from '@unional/gizmo'
import { expect, it } from 'vitest'
import { logTestGizmoFn } from './log_gizmo.testing.js'
import { createPrefixedGetNonConsoleLogger } from './logger.js'

it('prefix logger id', async () => {
	const { log } = await incubate().with(idTestGizmoFn()).with(logTestGizmoFn()).create()
	const getLogger = createPrefixedGetNonConsoleLogger({ log }, 'some-plugin')
	const r = getLogger('some-logger')
	r.notice('hello')

	expect(log.reporter.getLogMessagesWithIdAndLevel()).toEqual(['test:some-plugin:some-logger (NOTICE) hello'])
})

it('gets `app:prefix` as logger id when given empty id', async () => {
	const { log } = await incubate().with(idTestGizmoFn()).with(logTestGizmoFn()).create()
	const getLogger = createPrefixedGetNonConsoleLogger({ log }, 'some-plugin')
	const r = getLogger('')
	r.notice('hello')

	expect(log.reporter.getLogMessagesWithIdAndLevel()).toEqual(['test:some-plugin (NOTICE) hello'])
})
