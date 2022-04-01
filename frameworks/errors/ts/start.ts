import { Store } from '@just-web/states'
import { ModuleError } from 'iso-error'
import { registerOnErrorHandler } from './onerror'

export namespace start {
  export interface Options {
    errors: Store<ModuleError[]>,
    browserErrors?: {
      preventDefault: boolean
    }
  }
}

export async function start(options: start.Options) {
  registerOnErrorHandler({
    errors: options.errors,
    preventDefault: options.browserErrors?.preventDefault ?? true
  })
}
