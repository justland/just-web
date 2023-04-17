import { justTestApp } from '@just-web/app/testing'
import { commandsGizmoFn } from '@just-web/commands'
import { keyboardGizmoFn } from '@just-web/keyboard'
import { memoryPreferencesGizmo, preferencesGizmo } from './index.js'

export async function setupMemoryPreferencesTestApp() {
	return justTestApp()
		.with(keyboardGizmoFn())
		.with(commandsGizmoFn())
		.with(preferencesGizmo)
		.with(memoryPreferencesGizmo)
		.create()
}
