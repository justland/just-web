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

export function createErrorsContext(options?: ErrorsContextOptions): ErrorsContext {
  const errors = createErrorStore()
  registerOnErrorHandler({
    errors,
    preventDefault: options?.preventDefault ?? false
  })
  return Object.assign(toReadonlyErrorStore(errors), errorClasses)
}
