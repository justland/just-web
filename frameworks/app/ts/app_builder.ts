import { appGizmo, incubate, logGizmo, type AppGizmoOptions, type LogGizmoOptions } from '@just-web/framework'

export type AppBuilderOptions = AppGizmoOptions & LogGizmoOptions

export function appBuilder(options: AppBuilderOptions) {
	return incubate(appGizmo(options)).with(logGizmo(options))
}
