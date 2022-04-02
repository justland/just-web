export interface Command {
  /**
   * The command id. e.g. `just-web.showCommandPalette`
   */
  command: string,
  /**
   * Name of the command such as `Show command palette`.
   * If not specified,
   * it is default to Sentence case of the second part of the `id`.
   */
  name?: string,
  /**
   * Detail description about the command.
   * It will support some formatting such as markdown,
   * but not confirmed yet.
   */
  description?: string
}

export interface KeyBinding {
  /**
   * Command to bind to.
   */
  command: string,
  /**
   * Default key
   */
  key?: string,
  /**
   * MacOS specific key
   */
  mac?: string
}
