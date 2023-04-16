import { define } from '@unional/gizmo'
import { logic } from './id_gizmo.logic.js'

export type IdGizmoOptions = {
	name: string
}

export const idGizmoFn = define(({ name }: IdGizmoOptions) => ({
	async create() {
		return {
			name,
			id: logic.genAppID()
		}
	}
}))

export type IdGizmo = define.Infer<typeof idGizmoFn>
