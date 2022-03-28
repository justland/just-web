import type { SetState } from '@just-web/states'
import { produce } from 'immer'
import type { ModuleError } from 'iso-error'
import { required } from 'type-plus'
import { BrowserError } from './errors'

export namespace registerOnErrorHandler {
  export interface Ctx {
    window: Window
  }

  export interface Options {
    errors: ModuleError[],
    setErrors: SetState<ModuleError[]>,
    preventDefault: boolean
  }
}

export function registerOnErrorHandler({
  errors,
  setErrors,
  preventDefault
}: registerOnErrorHandler.Options, ctx?: registerOnErrorHandler.Ctx) {
  const { window: win } = required({ window }, ctx)
  win.onerror = function justwebOnError(event, source, lineno, colno, error) {
    const e = new BrowserError(event, source, lineno, colno, error)

    setErrors(produce(errors, errors => void errors.push(e)))
  }
  return preventDefault
}
