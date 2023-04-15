import { incubate } from '@unional/gizmo'
import { idGizmo } from './id_gizmo.js'

it(`requires a name`, async () => {
	// @ts-expect-error
	idGizmo()

	// @ts-expect-error
	idGizmo({})

	const app = await incubate(idGizmo({ name: 'app-name' })).create()

	expect(app.name).toEqual('app-name')
})

it('generates a 15 chars long app id', async () => {
	const app = await incubate(idGizmo({ name: 'test' })).create()

	expect(app.id.length).toEqual(15)
})
