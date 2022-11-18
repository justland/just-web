import { LogContext } from '@just-web/log'
import { definePlugin, PluginContext } from '@just-web/types'
import { ctx } from './browserPlugin.ctx'
import { createErrorStore, toReadonlyErrorStore } from './errorStore'

export type BrowserOptions = {
  browser?: {
    /**
     * Prevents the default event handler of `onerror` to be fired.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
     */
    preventDefault?: boolean
  }
}

export const browserPlugin = definePlugin((options?: BrowserOptions) => ({
  name: '@just-web/browser',
  init: ({ log }: LogContext) => {
    const errors = createErrorStore()
    // Normally plugin should not do work during init.
    // However this is a special case as we want to listen to any error,
    // including those occurs during the setup/loading phrase.
    ctx.registerOnErrorHandler({
      errors,
      log,
      preventDefault: options?.browser?.preventDefault ?? false
    })
    return [{
      browser: {
        errors: toReadonlyErrorStore(errors)
      }
    }]
  }
}))

export type BrowserContext = PluginContext<typeof browserPlugin>
