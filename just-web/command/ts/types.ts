
export interface Command {
  /**
   * The command id. e.g. `just-web.commandPalette`
   */
  id: string,
  description: string,
  handler(): void
}

export interface KeyBinding {
  command: string,
  key: string,
  mac?: string,
  when?: string
}
