import { justTestApp, type JustAppTestOptions } from '@just-web/app/testing'
import { commandsGizmoFn } from '@just-web/commands'
import { keyboardGizmoFn } from '@just-web/keyboard'
import { browserPreferencesGizmo } from './index.js'
import { browserTestGizmoFn, type BrowserTestGizmoOptions } from './testing/just_web_browser.js'

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
