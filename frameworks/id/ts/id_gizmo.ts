import { define } from '@unional/gizmo'
import { logic } from './id_gizmo.logic.js'

export type IdGizmoOptions = {
	name: string
}

/**
 * A gizmo function that creates an id gizmo.
 *
 * An id gizmo provides the specified name,
 * and generates a unique id for the gizmo.
 *
 * It is part of `justApp` and you normally don't need to use it directly.
 *
 * But if you do, you can use it like this (with `@unional/gizmo`):
 *
 * @example
 * ```ts
 * import { incubate } from '@unional/gizmo'
 *
 * const gizmo = await incubate(idGizmoFn({ name: 'my-app' })).create()
 * ```
 */
export const idGizmoFn = define((options: IdGizmoOptions) => ({
	async create() {
		return {
			...options,
			id: logic.genAppID()
		}
	}
}))

/**
 * A gizmo with name and id.
 */
export type IdGizmo = define.Infer<typeof idGizmoFn>
