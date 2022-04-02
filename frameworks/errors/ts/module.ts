import { createStore } from '@just-web/states'
import { ModuleError } from 'iso-error'
import { registerOnErrorHandler } from './onerror'

export namespace start {
  export interface Options {
    browserErrors?: {
      preventDefault: boolean
    }
  }
}

export async function start(options: start.Options) {
  const errors = createStore<ModuleError[]>([])
  registerOnErrorHandler({
    errors,
    preventDefault: options.browserErrors?.preventDefault ?? true
  })
  return { errors }
}
