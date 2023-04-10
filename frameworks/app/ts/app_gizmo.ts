import { define } from '@unional/gizmo'
import { ctx } from './app_gizmo.ctx.js'

export type AppGizmoOptions = {
	name: string
}

export const appGizmo = define(({ name }: AppGizmoOptions) => ({
	async create() {
		return {
			name,
			id: ctx.genAppID()
		}
	}
}))

export type AppGizmo = define.Infer<typeof appGizmo>
