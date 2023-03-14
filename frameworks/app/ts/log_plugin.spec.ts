import { createMemoryLogReporter, logLevels } from 'standard-log'
import { logPlugin } from './log_plugin.js'
import { logTestPlugin } from './log_plugin.mocks.js'

describe(`logPlugin()`, () => {
	it('provides app log methods', async () => {
		const reporter = createMemoryLogReporter()
		const ctx = await logPlugin({ log: { logLevel: logLevels.all, reporters: [reporter] } }).define({
			name: 'test-app'
		})

		ctx.log.alert('alert')
		ctx.log.count('count')
		ctx.log.count('count')
		ctx.log.critical('critical')
		ctx.log.debug('debug')
		ctx.log.emergency('emergency')
		ctx.log.error('error')
		ctx.log.info('info')
		ctx.log.notice('notice')
		ctx.log.planck('planck')
		ctx.log.on(logLevels.error, log => log('on error'))

		expect(
			reporter.logs.filter(l => l.id === 'test-app').map(l => `${ctx.log.toLogLevelName(l.level)}: ${l.args}`)
		).toEqual([
			'alert: alert',
			'debug: 1,count',
			'debug: 2,count',
			'critical: critical',
			'debug: debug',
			'emergency: emergency',
			'error: error',
			'info: info',
			'notice: notice',
			'planck: planck',
			'error: on error'
		])
	})

	it('can add custom levels', async () => {
		const reporter = createMemoryLogReporter()
		const ctx = await logPlugin({
			log: { customLevels: { silly: 500, spicy: 50 }, reporters: [reporter] }
		}).define({
			name: 'test-app'
			// id: ''
		})

		const l = ctx.log.getLogger('test logger')
		l.spicy(`it's spicy`)
		l.silly(`what's up`)

		expect(
			reporter.logs
				.filter(l => l.id === 'test-app:test logger')
				.map(l => `${ctx.log.toLogLevelName(l.level)}: ${l.args}`)
		).toEqual([`spicy: it's spicy`, `silly: what's up`])
	})
})

describe(`${logTestPlugin.name}().define()`, () => {
	it('defaults logLevel to debug and provides memory reporter', async () => {
		const { log } = await logTestPlugin().define({ name: 'test' })

		expect(log.logLevel).toEqual(logLevels.debug)
		log.info('hello')
		expect(log.reporter.getLogMessages()).toEqual(['hello'])
	})

	it('works with app name', async () => {
		const { log } = await logTestPlugin().define({ name: 'some-app' })
		log.notice('hello')

		expect(log.reporter.getLogMessagesWithIdAndLevel()).toEqual(['some-app (NOTICE) hello'])
	})

	it('works with additional reporters', async () => {
		const r = createMemoryLogReporter()
		const { log } = await logTestPlugin({ log: { reporters: [r] } }).define({ name: 'test' })
		log.notice('hello')

		// the build-in one will not be used
		expect(log.reporter.logs).toEqual([])

		expect(r.getLogMessagesWithIdAndLevel()).toEqual(['test (NOTICE) hello'])
	})
})
