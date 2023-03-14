import { createPrefixedGetLogger, createPrefixedGetNonConsoleLogger } from './logger.js'
import { logTestPlugin } from './log_plugin.mocks.js'

describe(`${createPrefixedGetLogger.name}()`, () => {
	it('prefix logger id', async () => {
		const { log } = await logTestPlugin().define({ name: 'test' })
		const getLogger = createPrefixedGetLogger({ log }, 'some-plugin')
		const r = getLogger('some-logger')
		r.notice('hello')

		expect(log.reporter.getLogMessagesWithIdAndLevel()).toEqual([
			'test:some-plugin:some-logger (NOTICE) hello'
		])
	})

	it('gets `app:prefix` as logger id when given empty id', async () => {
		const { log } = await logTestPlugin().define({ name: 'test' })
		const getLogger = createPrefixedGetLogger({ log }, 'some-plugin')
		const r = getLogger('')
		r.notice('hello')

		expect(log.reporter.getLogMessagesWithIdAndLevel()).toEqual(['test:some-plugin (NOTICE) hello'])
	})
})

describe(`${createPrefixedGetNonConsoleLogger.name}()`, () => {
	it('prefix logger id', async () => {
		const { log } = await logTestPlugin().define({ name: 'test' })
		const getLogger = createPrefixedGetNonConsoleLogger({ log }, 'some-plugin')
		const r = getLogger('some-logger')
		r.notice('hello')

		expect(log.reporter.getLogMessagesWithIdAndLevel()).toEqual([
			'test:some-plugin:some-logger (NOTICE) hello'
		])
	})

	it('gets `app:prefix` as logger id when given empty id', async () => {
		const { log } = await logTestPlugin().define({ name: 'test' })
		const getLogger = createPrefixedGetNonConsoleLogger({ log }, 'some-plugin')
		const r = getLogger('')
		r.notice('hello')

		expect(log.reporter.getLogMessagesWithIdAndLevel()).toEqual(['test:some-plugin (NOTICE) hello'])
	})
})
