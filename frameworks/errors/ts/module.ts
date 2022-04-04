import * as errorClasses from './errors'
import { createErrorStore, ErrorStore, ReadonlyErrorStore, toReadonlyErrorStore } from './errorStore'
import { registerOnErrorHandler } from './onerror'

export type Module = (typeof errorClasses) & ErrorStore

export type ReadonlyModule = (typeof errorClasses) & ReadonlyErrorStore

export interface ModuleOptions {
  browserErrors?: {
    preventDefault: boolean
  }
}

export function start(options?: ModuleOptions): Module {
  const errors = createErrorStore()
  registerOnErrorHandler({
    errors,
    preventDefault: options?.browserErrors?.preventDefault ?? true
  })
  return Object.assign(errors, errorClasses)
}

export function toReadonly(module: Module): ReadonlyModule {
  return {
    ...module,
    ...toReadonlyErrorStore(module)
  }
}
