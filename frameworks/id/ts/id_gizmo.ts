import { define } from '@unional/gizmo'
import { logic } from './id_gizmo.logic.js'

export type IdGizmoOptions = {
	name: string
}

export const idGizmoFn = define((options: IdGizmoOptions) => ({
	async create() {
		return {
			...options,
			id: logic.genAppID()
		}
	}
}))

export type IdGizmoFn = define.Infer<typeof idGizmoFn>
