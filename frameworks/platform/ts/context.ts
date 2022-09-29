import { LogContext } from '@just-web/log'
import { defineActivate, defineStart } from '@just-web/types'
import { startKeyBindings } from './keyBindings'
import { isMac } from './os'
import type { PlatformContext, ReadonlyPlatformContext } from './types'

export function createPlatformContext(): PlatformContext {
  return { isMac }
}

export function toReadonlyContext(module: PlatformContext): ReadonlyPlatformContext {
  return module
}

export const activate = defineActivate(async (ctx: LogContext) => ([{ isMac }, ctx]))

export namespace start {
  export interface Options extends startKeyBindings.Options {
    platform: PlatformContext
  }
}

export const start = defineStart(async (ctx: start.Options) => {
  const log = ctx.log.getLogger('@just-web/platform')
  log.trace('start')
  startKeyBindings(ctx)
})
