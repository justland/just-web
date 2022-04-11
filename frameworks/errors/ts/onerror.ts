import { BrowserError } from './errors'
import { ErrorStore } from './errorStore'

export namespace registerOnErrorHandler {
  export interface Ctx {
    window: Window & typeof globalThis
  }

  export interface Options {
    errors: ErrorStore,
    preventDefault: boolean
  }
}

export function registerOnErrorHandler(
  { errors, preventDefault }: registerOnErrorHandler.Options
) {
  const { window } = registerOnErrorHandler.ctx
  window.onerror = function justWebOnError(event, source, lineno, colno, error) {
    errors.add(new BrowserError(event, source, lineno, colno, error))
    return preventDefault
  }
}

registerOnErrorHandler.ctx = { window }
