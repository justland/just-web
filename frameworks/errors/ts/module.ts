import { createErrorStore } from './errorStore'
import { registerOnErrorHandler } from './onerror'

export namespace start {
  export interface Options {
    browserErrors?: {
      preventDefault: boolean
    }
  }
}

export async function start(options?: start.Options) {
  const errors = createErrorStore()
  registerOnErrorHandler({
    errors,
    preventDefault: options?.browserErrors?.preventDefault ?? true
  })
  return { errors }
}
