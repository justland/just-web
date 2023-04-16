import { a } from 'assertron'
import { testType } from 'type-plus'
import { IdGizmo, LogGizmo, createMemoryLogReporter, define, justApp, logLevels } from './index.js'
import { LeafGizmo, justTestApp, leafGizmo, sideEffectGizmo } from './testing/index.js'

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

	testType.canAssign<typeof app, IdGizmo & LogGizmo>(true)
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
		.with(leafGizmo)
		.create()

	testType.canAssign<typeof app, LeafGizmo>(true)
	expect(app.leaf.foo).toBeDefined()
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
	expect.assertions(1)
	const log2 = define({
		async create() {
			return {
				log: {
					info(value: string) {
						expect(value).toMatch(/^created \(id: .*\)$/)
					}
				}
			}
		}
	})

	const app = await justTestApp({ name: 'test-app' }).with(log2).create()
	testType.equal<(typeof app)['log'], { info(value: string): void }>(true)
})

it('starts will log an app start message', async () => {
	const reporter = createMemoryLogReporter()
	await justApp({ name: 'test-app', log: { reporters: [reporter] } }).create()

	a.satisfies(reporter.getLogMessagesWithIdAndLevel(), [/test-app \(INFO\) created \(id: .*\)/])
})

it('starts will call plugin start with an adjusted log', async () => {
	const app = await justTestApp({ name: 'test-app' })
		.with(
			define({
				static: define.require<LogGizmo>(),
				async create({ log }) {
					log.info('starting gizmo')
				}
			})
		)
		.create()

	a.satisfies(app.log.reporter.getLogMessagesWithIdAndLevel(), [
		'test-app (INFO) starting gizmo',
		/test-app \(INFO\) created \(id: .*\)/
	])
})
