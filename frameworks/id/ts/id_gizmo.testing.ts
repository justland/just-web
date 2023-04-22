import { define, type GizmoBase } from '@unional/gizmo'
import { idGizmoFn, type IdGizmoOptions } from './id_gizmo.js'

/**
 * A gizmo function that creates a test id gizmo.
 *
 * It allows you to create the gizmo without the option.
 * It defaults `name` as 'test'.
 */
export const idTestGizmoFn: (options?: IdGizmoOptions) => GizmoBase<{
	id: string
	name: string
}> = define((options: IdGizmoOptions = { name: 'test' }) => ({
	async create(ctx) {
		return ctx.with(idGizmoFn(options))
	}
}))
