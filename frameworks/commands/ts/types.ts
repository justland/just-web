
export interface CommandHandler {
  (): void
}

export interface Command {
  /**
   * The command id. e.g. `just-web.showCommandPalette`
   */
  command: string,
  handler: CommandHandler
}
