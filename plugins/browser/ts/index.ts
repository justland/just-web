import { definePlugin } from '@just-web/types'
import { createErrorStore, toReadonlyErrorStore } from './errorStore'
import { registerOnErrorHandler } from './onerror'
import type { BrowserContext, BrowserInitContext, BrowserOptions } from './types'

export * from './errors'
export { BrowserContext, BrowserInitContext, BrowserOptions }

export default definePlugin((options?: BrowserOptions) => ({
  name: '@just-web/browser',
  init: (): [BrowserContext] => {
    const errors = createErrorStore()
    // Normally plugin should not do work during init.
    // However this is a special case as we want to listen to any error,
    // including those occurs during the setup/loading phrase.
    registerOnErrorHandler({
      errors,
      preventDefault: options?.browser?.preventDefault ?? false
    })
    return [{
      browser: { errors: toReadonlyErrorStore(errors) }
    }]
  }
}))

export function createErrorsContext(ctx?: BrowserInitContext): BrowserContext {
  const errors = createErrorStore()
  registerOnErrorHandler({
    errors,
    preventDefault: ctx?.options?.browser?.preventDefault ?? false
  })
  return {
    browser: { errors: toReadonlyErrorStore(errors) }
  }
}
