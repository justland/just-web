import type { Registry, WithAdder } from '@just-web/states'
import type { AnyFunction } from 'type-plus'

export type CommandHandler = {
  /**
   * The command id. e.g. `just-web.showCommandPalette`
   */
  command: string,
  handler: AnyFunction
}

export type HandlerRegistry = {
  /**
   * register handler for the specified command.
   */
  register(command: string, handler: AnyFunction): void,
  /**
   * invoke a registered command.
   * @param args arguments for the command
   */
  invoke(command: string, ...args: any[]): any,
  /**
   * Gets all registered command names.
   */
  keys(): string[]
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

export interface ContributionRegistry
  extends Registry<string, CommandContribution>, WithAdder<CommandContribution> { }

export type CommandsContext = {
  commands: {
    contributions: ContributionRegistry,
    handlers: HandlerRegistry,
    showCommandPalette(): any
  }
}

export type Command<F extends AnyFunction> = {
  (...args: Parameters<F>): ReturnType<F>,
  type: string,
  connect(context: CommandsContext, handler: F): void,
  defineHandler(handler: F): F,
  defineArgs<A extends Parameters<F>>(...args: A): A
}

export type Command_WithDefault<F extends AnyFunction> = {
  (...args: Parameters<F>): ReturnType<F>,
  type: string,
  defaultHandler: F,
  connect(context: CommandsContext): void,
  defineHandler(handler: F): F,
  defineArgs<A extends Parameters<F>>(...args: A): A
}
