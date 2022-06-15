import { startKeyBindings } from './keyBindings'
import { isMac } from './os'
import type { PlatformContext, ReadonlyPlatformContext } from './types'

export function createPlatformContext(): PlatformContext {
  return { isMac }
}

export function toReadonlyContext(module: PlatformContext): ReadonlyPlatformContext {
  return module
}

export namespace start {
  export interface Options extends startKeyBindings.Options {
    platform: PlatformContext
  }
}

export async function start(options: start.Options) {
  const log = options.log.getLogger('@just-web/platform')
  log.trace('start')
  startKeyBindings(options)
}
