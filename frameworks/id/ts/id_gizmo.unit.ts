import { incubate } from '@unional/gizmo'
import { range } from 'ramda'
import { record } from 'type-plus'
import { idGizmoFn } from './id_gizmo.js'

it('randomize the app id', async () => {
	const ids = await Promise.all(
		range(0, 100).map(async () => (await incubate(idGizmoFn({ name: 'random' })).create()).id)
	)

	const x = ids.reduce((p, v) => ((p[v] = true), p), record())

	expect(Object.keys(x).length).toBe(100)
})
