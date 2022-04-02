import { commandRegistry } from './commandRegistry'

export namespace start {
  export interface Options extends commandRegistry.Options { }
}

export function start(options: start.Options) {
  return { commands: commandRegistry(options) }
}
