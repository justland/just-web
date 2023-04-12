import { define } from '@unional/gizmo'
import { logic } from './app_gizmo.logic.js'

export type AppGizmoOptions = {
	name: string
}

export const appGizmo = define(({ name }: AppGizmoOptions) => ({
	async create() {
		return {
			name,
			id: logic.genAppID()
		}
	}
}))

export type AppGizmo = define.Infer<typeof appGizmo>
