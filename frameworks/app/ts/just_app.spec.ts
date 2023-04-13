import { AppGizmo, LogGizmo, createMemoryLogReporter, define, logLevels } from '@just-web/framework'
import { sideEffectGizmo } from '@just-web/framework/testing'
import { OSGizmo, osGizmo } from '@just-web/os'
import { a } from 'assertron'
import { testType } from 'type-plus'
import { justApp } from './just_app.js'
import { justTestApp } from './just_app.mocks.js'

it(`requires a name`, async () => {
	// @ts-expect-error
	justApp({})

	const app = await justTestApp({ name: 'app-name' }).create()

	expect(app.name).toEqual('app-name')
})

it('generates a 15 chars long app id', async () => {
	const app = await justTestApp({ name: 'test' }).create()

	expect(app.id.length).toEqual(15)
})

it('can use a gizmo with only side effects', async () => {
	const app = await justTestApp({ name: 'test' }).with(sideEffectGizmo).create()

	testType.canAssign<typeof app, AppGizmo & LogGizmo>(true)
})

it('can use a gizmo returning single value tuple', async () => {
	const g = define({
		async create() {
			return [{ a: 1 }]
		}
	})
	const app = await justTestApp({ name: 'test' }).with(g).create()

	testType.canAssign<typeof app, { a: number }>(true)
})

it('adds gizmo to the app', async () => {
	const app = await justTestApp({ name: 'test-app', log: { logLevel: logLevels.none } })
		.with(osGizmo)
		.create()

	testType.canAssign<typeof app, OSGizmo>(true)
	expect(app.os.isMac).toBeDefined()
})

it('can use a gizmo needing partial context', async () => {
	const partialGizmo = define({
		static: define.require<{ name: string }>(),
		async create(ctx) {
			return { a: ctx.name }
		}
	})

	const app = await justTestApp({ name: 'test-app' }).with(partialGizmo).create()
	expect(app.a).toEqual('test-app')
})

it('allows one gizmo to override another', async () => {
	const log2 = define({
		async create() {
			return { log: console }
		}
	})

	const app = await justTestApp({ name: 'test-app' }).with(log2).create()
	testType.canAssign<typeof app, { log: typeof console }>(true)
	expect(app.log).toEqual(console)
})

it('starts will log an app start message', async () => {
	const reporter = createMemoryLogReporter()
	await justApp({ name: 'test-app', log: { reporters: [reporter] } }).create()

	a.satisfies(reporter.getLogMessagesWithIdAndLevel(), [/test-app \(INFO\) created \(id: .*\)/])
})
