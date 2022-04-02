import { produce } from 'immer'
import { required } from 'type-plus'
import { BrowserError } from './errors'
import { ErrorStore } from './errorStore'

export namespace registerOnErrorHandler {
  export interface Ctx {
    window: Window
  }

  export interface Options {
    errors: ErrorStore,
    preventDefault: boolean
  }
}

export function registerOnErrorHandler(
  { errors, preventDefault }: registerOnErrorHandler.Options,
  ctx?: registerOnErrorHandler.Ctx
) {
  const { window: win } = required({ window }, ctx)
  win.onerror = function justwebOnError(event, source, lineno, colno, error) {
    errors.set(produce(
      errors.get(),
      errors => void errors.push(
        new BrowserError(event, source, lineno, colno, error)
      )))
  }
  return preventDefault
}
