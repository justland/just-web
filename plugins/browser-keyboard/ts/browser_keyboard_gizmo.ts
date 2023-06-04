import { define, type LogGizmo } from '@just-web/app'
import type { CommandsGizmo } from '@just-web/commands'
import type { KeyboardGizmo } from '@just-web/keyboard'
import type { OSGizmo } from '@just-web/os'
import { startKeyBindings } from './keyBindings.js'

/**
 * Keyboard Gizmo implementation for the browser.
 */
export const browserKeyboardGizmo = define({
	static: define.require<LogGizmo>().require<KeyboardGizmo>().require<CommandsGizmo>().require<OSGizmo>(),
	async create(ctx) {
		return [undefined, () => startKeyBindings(ctx)]
	}
})
