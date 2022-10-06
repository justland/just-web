import type { AnyFunction } from 'type-plus'

export interface Command {
  /**
   * The command id. e.g. `just-web.showCommandPalette`
   */
  command: string,
  handler: AnyFunction
}

export type CommandContribution = {
  /**
   * The command id. e.g. `just-web.showCommandPalette`
   */
  command: string,
  /**
   * Name of the command such as `Show command palette`.
   * If not specified,
   * it is default to Sentence Case of the second part of the `id`.
   */
  name?: string,
  /**
   * Detail description about the command.
   * It will support some formatting such as markdown,
   * but not confirmed yet.
   */
  description?: string,
  /**
   * By default, all commands will be available to the command palette.
   * Set this to false to prevent it from appearing in the command palette.
   */
  commandPalette?: false,
  /**
   * Category can be used by the UI to group or filter the command.
   */
  category?: string,

  icon?: {
    light: string,
    /**
     * If not specified, the `light` icon will be used.
     */
    dark?: string
  },
  // ? no use case yet
  // enabled?: boolean,
  // when?: string,
}
