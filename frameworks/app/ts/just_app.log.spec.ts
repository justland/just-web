import { a, some } from 'assertron'
import { testType } from 'type-plus'
import { createMemoryLogReporter, define, justApp, logLevels, type LogGizmo } from './index.js'
import { justTestApp } from './testing/index.js'

it('comes with log', async () => {
	const app = await justTestApp({ name: 'test' }).create()

	testType.canAssign<typeof app, LogGizmo>(true)
})

it('can specify log options', async () => {
	const app = await justTestApp({ name: 'test', log: { logLevel: logLevels.debug } }).create()

	expect(app.log.logLevel).toEqual(logLevels.debug)
})

it('the log id is the app name', async () => {
	const reporter = createMemoryLogReporter()
	const app = await justApp({ name: 'test-app', log: { reporters: [reporter] } }).create()
	app.log.info('hello')

	a.satisfies(reporter.logs, some({ id: 'test-app', args: ['hello'] }))
})

it('uses internal log if app overrides the log property with an incompatible one', async () => {
	const altLogGizmo = define({
		async create() {
			return {
				log: undefined
			}
		}
	})
	const reporter = createMemoryLogReporter()
	await justTestApp({ log: { reporters: [reporter] } })
		.with(altLogGizmo)
		.create()

	a.satisfies(reporter.getLogMessagesWithLevel(), some(/\(INFO\) created/))
})
