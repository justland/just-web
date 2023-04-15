import { define, GizmoBase } from '@unional/gizmo'
import { idGizmoFn, type IdGizmoOptions } from './id_gizmo.js'

export const idTestGizmoFn: (options?: IdGizmoOptions) => GizmoBase<{
	id: string
	name: string
}> = define((options: IdGizmoOptions = { name: 'test' }) => ({
	async create() {
		return idGizmoFn(options).create()
	}
}))
