import { defineInitialize } from '@just-web/types'
import * as errorClasses from './errors'
import { createErrorStore, ReadonlyErrorStore, toReadonlyErrorStore } from './errorStore'
import { registerOnErrorHandler } from './onerror'

export type ErrorsContext = (typeof errorClasses) & ReadonlyErrorStore

export interface ErrorsContextOptions {
  /**
   * Prevents the default event handler of `onerror` to be fired.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
   */
  preventDefault?: boolean
}

export const initialize = defineInitialize(async (ctx: { options?: ErrorsContextOptions }) => {
  const errors = createErrorStore()
  registerOnErrorHandler({
    errors,
    preventDefault: ctx.options?.preventDefault ?? false
  })
  return [Object.assign(toReadonlyErrorStore(errors), errorClasses)]
})

export function createErrorsContext(options?: ErrorsContextOptions): ErrorsContext {
  const errors = createErrorStore()
  registerOnErrorHandler({
    errors,
    preventDefault: options?.preventDefault ?? false
  })
  return Object.assign(toReadonlyErrorStore(errors), errorClasses)
}
