import { startKeyBindings } from './keyBindings'
import { log } from './log'
import { isMac } from './os'

export interface PlatformContext {
  isMac: typeof isMac
}

export interface ReadonlyPlatformContext {
  isMac: typeof isMac
}

export function createContext(): PlatformContext {
  return { isMac }
}

export function toReadonlyContext(module: PlatformContext): ReadonlyPlatformContext {
  return module
}

export namespace start {
  export interface Options extends startKeyBindings.Options { }
}

export async function start(options: start.Options) {
  log.trace('start')
  startKeyBindings(options)
}
