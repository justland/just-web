import { idGizmoFn } from '@just-web/id'
import { logGizmoFn } from '@just-web/log'
import { incubate } from '@unional/gizmo'
import { statesGizmo } from './states_gizmo.js'

it('can create state', async () => {
	const { states } = await incubate()
		.with(idGizmoFn({ name: 'test' }))
		.with(logGizmoFn())
		.with(statesGizmo)
		.create()
	const [value] = states.createState(0)
	expect(value).toEqual(0)
})
