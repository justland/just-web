import { a, some } from 'assertron'
import { testType } from 'type-plus'
import type { LogGizmo } from './index.js'
import { createMemoryLogReporter, justApp, logLevels } from './index.js'
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
