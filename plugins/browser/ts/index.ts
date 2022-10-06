import { LogContext } from '@just-web/log'
import { definePlugin } from '@just-web/types'
import { createErrorStore, toReadonlyErrorStore } from './errorStore'
import { ctx } from './index.ctx'
import type { ReadonlyErrorStore } from './types'

export * from './errors'
export { ReadonlyErrorStore }

export type BrowserOptions = {
  browser?: {
    /**
     * Prevents the default event handler of `onerror` to be fired.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
     */
    preventDefault?: boolean
  }
}

const plugin = definePlugin((options?: BrowserOptions) => ({
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
      browser: { errors: toReadonlyErrorStore(errors) }
    }]
  }
}))

export default plugin

export type BrowserContext = ReturnType<ReturnType<typeof plugin>['init']>[0]
