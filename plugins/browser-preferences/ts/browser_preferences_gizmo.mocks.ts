import { justTestApp, type JustAppTestOptions } from '@just-web/app/testing'
import { browserTestGizmoFn, type BrowserTestGizmoOptions } from '@just-web/browser/testing'
import { commandsGizmoFn } from '@just-web/commands'
import { keyboardGizmoFn } from '@just-web/keyboard'
import { browserPreferencesGizmo } from './browser_preferences_gizmo.js'

export function browserPreferencesGizmoTestApp(
	options?: JustAppTestOptions & { browser?: BrowserTestGizmoOptions }
) {
	return justTestApp(options)
		.with(keyboardGizmoFn())
		.with(commandsGizmoFn())
		.with(browserTestGizmoFn(options?.browser))
		.with(browserPreferencesGizmo)
		.create()
}
