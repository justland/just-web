import { define } from '@unional/gizmo'
import { logic } from './id_gizmo.logic.js'

export type IdGizmoOptions = {
	name: string
}

export const idGizmo = define((options: IdGizmoOptions) => ({
	async create() {
		return {
			...options,
			id: logic.genAppID()
		}
	}
}))

export type IdGizmo = define.Infer<typeof idGizmo>
