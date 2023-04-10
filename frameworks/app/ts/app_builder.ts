import { incubate, type Gizmo } from '@unional/gizmo'
import { AppGizmoOptions, appGizmo } from './app_gizmo.js'
import { LogGizmoOptions, logGizmo } from './log_gizmo.js'

export type AppBuilderOptions = AppGizmoOptions & LogGizmoOptions

export function appBuilder(options: AppBuilderOptions) {
	const incubator = incubate(appGizmo(options)).with(logGizmo(options))

	return {
		async with(gizmo: Gizmo) {
			incubator.with(gizmo)
			return this
		},
		async build() {
			return incubator.create()
		}
	}
}
