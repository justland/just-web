import { incubate } from '@unional/gizmo'
import { expect, it } from 'vitest'
import { idGizmoFn } from './index.js'

it('requires a name', async () => {
	// @ts-expect-error
	idGizmoFn()

	// @ts-expect-error
	idGizmoFn({})

	const app = await incubate()
		.with(idGizmoFn({ name: 'app-name' }))
		.create()

	expect(app.name).toEqual('app-name')
})

it('generates a 15 chars long app id', async () => {
	const app = await incubate()
		.with(idGizmoFn({ name: 'test' }))
		.create()

	expect(app.id.length).toEqual(15)
})
