import { logGizmoFn } from '@just-web/log'
import { incubateApp } from './just_app.logic.js'
import type { AppBuilderOptions } from './just_app.types.js'

export function justApp(options: AppBuilderOptions) {
	return incubateApp(options).with(logGizmoFn(options.log))
}
