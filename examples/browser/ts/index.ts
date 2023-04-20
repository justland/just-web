import { justApp } from '@just-web/app'
import { commandsGizmoFn } from '@just-web/commands'
import { presetsBrowserGizmoFn } from '@just-web/presets-browser'
import { createState, statesGizmo } from '@just-web/states'

export async function main() {
	const app = await justApp({ name: 'browser-app' })
		.with(commandsGizmoFn())
		.with(presetsBrowserGizmoFn())
		.with(statesGizmo)
		.create()

	const [value] = createState('hello')
	app.log.info('started', value)
}
