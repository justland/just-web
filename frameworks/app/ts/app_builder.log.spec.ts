import type { LogGizmo } from '@just-web/framework'
import { createMemoryLogReporter, logLevels } from '@just-web/framework'
import { a } from 'assertron'
import { testType } from 'type-plus'
import { appBuilder } from './app_builder.js'

it('comes with log', async () => {
	const app = await appBuilder({ name: 'test' }).create()

	testType.canAssign<typeof app, LogGizmo>(true)
})

it('can specify log options', async () => {
	const app = await appBuilder({ name: 'test', log: { logLevel: logLevels.debug } }).create()

	expect(app.log.logLevel).toEqual(logLevels.debug)
})

it('the log id is the app name', async () => {
	const reporter = createMemoryLogReporter()
	const app = await appBuilder({ name: 'test-app', log: { reporters: [reporter] } }).create()
	app.log.info('hello')

	a.satisfies(reporter.logs, [{ id: 'test-app', args: ['hello'] }])
})
