import { incubate } from '@unional/gizmo'
import { appGizmo, type AppGizmoOptions } from './app_gizmo.js'
import { logGizmo, type LogGizmoOptions } from './log_gizmo.js'

export type AppBuilderOptions = AppGizmoOptions & LogGizmoOptions

export function appBuilder(options: AppBuilderOptions) {
	return incubate(appGizmo(options)).with(logGizmo(options))
}
