import { logGizmoFn } from '@just-web/log'
import { incubateApp } from './just_app.logic.js'
import type { JustAppOptions } from './just_app.types.js'
import type { IdGizmo } from './just_web_id.js'
import type { GizmoIncubator } from './unional_gizmo.js'

export function justApp(options: JustAppOptions) {
	return incubateApp(options).with(logGizmoFn(options.log))
}

export namespace justApp {
	export type Infer<App extends GizmoIncubator<IdGizmo>> = Awaited<ReturnType<App['create']>>
}
