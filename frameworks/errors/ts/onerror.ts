import { required } from 'type-plus'
import { BrowserError, errors } from './errors'

export namespace registerOnErrorHandler {
  export interface Ctx {
    window: Window
  }
}

export function registerOnErrorHandler(preventDefault: boolean, ctx?: registerOnErrorHandler.Ctx) {
  const { window: win } = required({ window }, ctx)
  win.onerror = function justwebOnError(event, source, lineno, colno, error) {
    const e = new BrowserError(event, source, lineno, colno, error)
    errors.push(e)
  }
  return false
}
