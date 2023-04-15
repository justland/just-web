import { define } from '@unional/gizmo'
import { idGizmoFn, type IdGizmoOptions } from './id_gizmo.js'

export const idTestGizmoFn = define((options: IdGizmoOptions = { name: 'test' }) => ({
	async create() {
		return idGizmoFn(options).create()
	}
}))
