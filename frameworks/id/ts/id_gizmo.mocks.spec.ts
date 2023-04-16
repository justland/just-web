import { incubate } from '@unional/gizmo'
import { idTestGizmoFn } from './id_gizmo.mocks.js'

it('default name to "test"', async () => {
	const { name } = await incubate().with(idTestGizmoFn()).create()

	expect(name).toEqual('test')
})

it('can specify name', async () => {
	const { name } = await incubate()
		.with(idTestGizmoFn({ name: 'test-x' }))
		.create()

	expect(name).toEqual('test-x')
})
