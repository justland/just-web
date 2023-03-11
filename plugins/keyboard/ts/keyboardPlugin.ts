import type { LogContext } from '@just-web/log'
import { definePlugin, PluginContext } from '@just-web/types'
import { keyBindingRegistry } from './keyBindings.js'

export type KeyboardOptions = {
	keyboard?: {
		keyBindingContributions?: keyBindingRegistry.Options
	}
}

const keyboardPlugin = definePlugin((options?: KeyboardOptions) => ({
	name: '@just-web/keyboard',
	init: (ctx: LogContext) => {
		const keyBindingContributions = keyBindingRegistry(ctx, options?.keyboard?.keyBindingContributions)

		return [{ keyboard: { keyBindingContributions } }]
	}
}))

export type KeyboardContext = PluginContext<typeof keyboardPlugin>

export default keyboardPlugin
