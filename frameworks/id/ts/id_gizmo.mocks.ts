import { define, type GizmoBase } from '@unional/gizmo'
import { idGizmoFn, type IdGizmoOptions } from './id_gizmo.js'

export const idTestGizmoFn: (options?: IdGizmoOptions) => GizmoBase<{
	id: string
	name: string
}> = define((options: IdGizmoOptions = { name: 'test' }) => ({
	async create(ctx) {
		return ctx.with(idGizmoFn(options))
	}
}))
