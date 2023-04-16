import type { LogContext } from '@just-web/log'
import { definePlugin, PluginContext } from '@just-web/types'
import { ctx } from './browserPlugin.ctx.js'
import { createErrorStore, toReadonlyErrorStore } from './error_store.js'

export type BrowserOptions = {
	browser?: {
		/**
		 * Prevents the default event handler of `onerror` to be fired.
		 * @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
		 */
		preventDefault?: boolean
	}
}

const browserPlugin = definePlugin((options?: BrowserOptions) => ({
	name: '@just-web/browser',
	init: ({ log }: LogContext) => {
		const errors = createErrorStore()
		// Normally plugin should not do work during init.
		// However this is a special case as we want to listen to any error,
		// including those occurs during the setup/loading phrase.
		ctx.registerOnErrorHandler(
			{
				errors,
				preventDefault: options?.browser?.preventDefault ?? false
			},
			{ log }
		)
		return [
			{
				browser: {
					errors: toReadonlyErrorStore(errors)
				}
			}
		]
	}
}))

export type BrowserContext = PluginContext<typeof browserPlugin>

export default browserPlugin
