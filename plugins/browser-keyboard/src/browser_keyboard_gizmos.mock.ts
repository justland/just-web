import { justTestApp } from '@just-web/app/testing'
import { commandsGizmoFn } from '@just-web/commands'
import { keyboardGizmoFn } from '@just-web/keyboard'
import { osGizmo } from '@just-web/os'
import { browserKeyboardGizmo } from './index.js'

export async function browserKeyboardGizmoTestApp() {
	const app = await justTestApp()
		.with(keyboardGizmoFn())
		.with(commandsGizmoFn())
		.with(osGizmo)
		.with(browserKeyboardGizmo)
		.create()
	return app
}
