import { justTestApp } from '@just-web/app/testing'
import { commandsGizmoFn } from '@just-web/commands'
import { keyboardGizmoFn } from '@just-web/keyboard'
import { memoryPreferencesGizmo } from './index.js'
import { preferencesGizmo } from './preferences_gizmo.js'

export async function setupMemoryPreferencesTestApp() {
	return justTestApp()
		.with(keyboardGizmoFn())
		.with(commandsGizmoFn())
		.with(preferencesGizmo)
		.with(memoryPreferencesGizmo)
		.create()
}
