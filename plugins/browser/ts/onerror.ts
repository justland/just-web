import type { LogContext } from '@just-web/log'
import { BrowserError } from './errors.js'
import { ErrorStore } from './errorStore.js'
import { ctx } from './onerror.ctx.js'

export namespace registerOnErrorHandler {
  export interface Ctx {
    window: Window & typeof globalThis
  }

  export type Options = {
    errors: ErrorStore
    preventDefault: boolean
  } & LogContext
}

export function registerOnErrorHandler({ errors, preventDefault, log }: registerOnErrorHandler.Options) {
  const logger = log.getNonConsoleLogger('@just-web/browser')
  const window = ctx.getWindow()
  window.onerror = function justWebOnError(event, source, lineno, colno, error) {
    const e = new BrowserError(event, source, lineno, colno, error)
    errors.add(e)
    logger.error(`onerror detected`, e)
    return preventDefault
  }
}
