import { idGizmoFn } from '@just-web/id'
import { incubate } from '@unional/gizmo'
import { createMemoryLogReporter, logGizmoFn, logLevels } from './index.js'

it('default log level to info', async () => {
	const { log } = await incubate()
		.with(idGizmoFn({ name: 'test' }))
		.with(logGizmoFn())
		.create()
	expect(log.logLevel).toEqual(logLevels.info)
})

it('provides app log methods', async () => {
	const reporter = createMemoryLogReporter()
	const { log } = await incubate()
		.with(idGizmoFn({ name: 'test-app' }))
		.with(logGizmoFn({ logLevel: logLevels.all, reporters: [reporter] }))
		.create()

	log.alert('alert')
	log.count('count')
	log.count('count')
	log.critical('critical')
	log.debug('debug')
	log.emergency('emergency')
	log.error('error')
	log.info('info')
	log.notice('notice')
	log.planck('planck')
	log.on(logLevels.error, log => log('on error'))

	expect(
		reporter.logs.filter(l => l.id === 'test-app').map(l => `${log.toLogLevelName(l.level)}: ${l.args}`)
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
	const ctx = await incubate()
		.with(idGizmoFn({ name: 'test-app' }))
		.with(logGizmoFn({ customLevels: { silly: 500, spicy: 50 }, reporters: [reporter] }))
		.create()

	const l = ctx.log.getLogger('test logger')
	l.spicy(`it's spicy`)
	l.silly(`what's up`)

	expect(
		reporter.logs
			.filter(l => l.id === 'test-app:test logger')
			.map(l => `${ctx.log.toLogLevelName(l.level)}: ${l.args}`)
	).toEqual([`spicy: it's spicy`, `silly: what's up`])
})

it('get logger prefixed with name', async () => {
	const reporter = createMemoryLogReporter()
	const app = await incubate()
		.with(idGizmoFn({ name: 'test' }))
		.with(logGizmoFn({ reporters: [reporter] }))
		.create()

	const l = app.log.getLogger('test logger')
	l.info('hello')

	expect(reporter.getLogMessagesWithIdAndLevel()).toEqual(['test:test logger (INFO) hello'])
})

it('can create a logger without specifying a name. which will use the name from the id gizmo', async () => {
	const reporter = createMemoryLogReporter()
	const app = await incubate()
		.with(idGizmoFn({ name: 'test' }))
		.with(logGizmoFn({ reporters: [reporter] }))
		.create()

	const l = app.log.getLogger()
	l.info('hello')

	expect(reporter.getLogMessagesWithIdAndLevel()).toEqual(['test (INFO) hello'])
})
