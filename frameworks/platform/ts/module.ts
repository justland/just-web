import * as os from './os'
import { startKeyBindings } from './keyBindings'

export type Module = (typeof os)
export type ReadonlyModule = (typeof os)

export interface ModuleOptions extends startKeyBindings.Options {
}

export function create(options: ModuleOptions): Module {
  startKeyBindings(options)
  return os
}

export function toReadonly(module: Module): ReadonlyModule {
  return module
}
