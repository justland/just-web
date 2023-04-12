import { AppGizmo, LogGizmo, define } from '@just-web/framework'
import { sideEffectGizmo } from '@just-web/framework/testing'
import { testType } from 'type-plus'
import { appBuilder } from './app_builder.js'

it(`requires a name`, async () => {
	// @ts-expect-error
	appBuilder({})

	const app = await appBuilder({ name: 'app-name' }).create()

	expect(app.name).toEqual('app-name')
})

it('generates a 15 chars long app id', async () => {
	const app = await appBuilder({ name: 'test' }).create()

	expect(app.id.length).toEqual(15)
})

it('can use a gizmo with only side effects', async () => {
	const app = await appBuilder({ name: 'test' }).with(sideEffectGizmo).create()

	testType.equal<typeof app, AppGizmo & LogGizmo>(true)
})

it('can use a gizmo returning single value tuple', async () => {
	const g = define({
		async create() {
			return [{ a: 1 }]
		}
	})
	const app = await appBuilder({ name: 'test' }).with(g).create()

	testType.canAssign<typeof app, { a: number }>(true)
})
