import { logTestGizmo } from '@just-web/framework/testing'
import { incubateApp } from './just_app.logic.js'
import type { AppBuilderOptions } from './just_app.types.js'

export function justTestApp(options: AppBuilderOptions) {
	return incubateApp(options).with(logTestGizmo(options))
}
