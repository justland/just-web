import type { AnyFunction } from 'type-plus'

export interface Command {
  /**
   * The command id. e.g. `just-web.showCommandPalette`
   */
  command: string,
  handler: AnyFunction
}
