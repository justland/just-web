import type { LogGizmo } from '@just-web/framework'
import { createMemoryLogReporter, logLevels } from '@just-web/framework'
import { a, some } from 'assertron'
import { testType } from 'type-plus'
import { justApp } from './just_app.js'
import { justTestApp } from './just_app.mocks.js'

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
