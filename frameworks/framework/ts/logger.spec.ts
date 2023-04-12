import { incubate } from '@unional/gizmo'
import { createPrefixedGetLogger, createPrefixedGetNonConsoleLogger } from './logger.js'
import { appGizmo } from './app_gizmo.js'
import { logTestGizmo } from './log_gizmo.mocks.js'

describe(`${createPrefixedGetLogger.name}()`, () => {
	it('prefix logger id', async () => {
		const { log } = await incubate()
			.with(appGizmo({ name: 'test' }))
			.with(logTestGizmo())
			.create()

		const getLogger = createPrefixedGetLogger({ log }, 'some-plugin')
		const r = getLogger('some-logger')
		r.notice('hello')

		expect(log.reporter.getLogMessagesWithIdAndLevel()).toEqual([
			'test:some-plugin:some-logger (NOTICE) hello'
		])
	})

	it('gets `app:prefix` as logger id when given empty id', async () => {
		const { log } = await incubate()
			.with(appGizmo({ name: 'test' }))
			.with(logTestGizmo())
			.create()
		const getLogger = createPrefixedGetLogger({ log }, 'some-plugin')
		const r = getLogger('')
		r.notice('hello')

		expect(log.reporter.getLogMessagesWithIdAndLevel()).toEqual(['test:some-plugin (NOTICE) hello'])
	})
})

describe(`${createPrefixedGetNonConsoleLogger.name}()`, () => {
	it('prefix logger id', async () => {
		const { log } = await incubate()
			.with(appGizmo({ name: 'test' }))
			.with(logTestGizmo())
			.create()
		const getLogger = createPrefixedGetNonConsoleLogger({ log }, 'some-plugin')
		const r = getLogger('some-logger')
		r.notice('hello')

		expect(log.reporter.getLogMessagesWithIdAndLevel()).toEqual([
			'test:some-plugin:some-logger (NOTICE) hello'
		])
	})

	it('gets `app:prefix` as logger id when given empty id', async () => {
		const { log } = await incubate()
			.with(appGizmo({ name: 'test' }))
			.with(logTestGizmo())
			.create()
		const getLogger = createPrefixedGetNonConsoleLogger({ log }, 'some-plugin')
		const r = getLogger('')
		r.notice('hello')

		expect(log.reporter.getLogMessagesWithIdAndLevel()).toEqual(['test:some-plugin (NOTICE) hello'])
	})
})
