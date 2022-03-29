import { required } from 'type-plus'
import { registerOnErrorHandler } from './onerror'

export namespace start {
  export interface Options {
    browserErrors?: {
      preventDefault: boolean
    }
  }
}

export async function start(options?: start.Options) {
  registerOnErrorHandler(required(
    { preventDefault: true },
    options?.browserErrors
  ))
}
