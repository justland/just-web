import { KeyboardContext } from '@just-web/keyboard'
import type { Registry, WithAdder } from '@just-web/states'
import { JustEmpty, JustFunction, JustValues } from 'just-func'
import type { AnyFunction } from 'type-plus'

export type CommandHandler = {
  /**
   * The command id. e.g. `just-web.showCommandPalette`
   */
  id: string,
  handler: AnyFunction
}

export type HandlerRegistry = {
  /**
   * register handler for the specified command.
   */
  register(id: string, handler: AnyFunction): void,
  register(info: CommandHandler): void,
  /**
   * invoke a registered command.
   * @param args arguments for the command
   */
  invoke(id: string, ...args: any[]): any,
  /**
   * Gets all registered command names.
   */
  keys(): string[],
  has(id: string): boolean
}

export type CommandContribution = {
  /**
   * The command id. e.g. `just-web.showCommandPalette`
   *
   * It should be unique across the application.
   * It should follow the `<plugin>.<name>` pattern.
   *
   * For example: `just-web.showCommandPalette`
   * The resulting command function will also have this as the name.
   */
  id: string,
  /**
   * Name of the command such as `Show command palette`.
   * If not specified,
   * it is default to Sentence Case of the second part of the `id`.
   */
  title?: string,
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
    showCommandPalette(): void
  }
}

export namespace JustCommand {
  export type Base<
    Param extends JustValues = JustEmpty,
    R extends JustValues = JustEmpty
  > = JustFunction<Param, R> & {
    id: string,
    defineHandler(handler: JustFunction<Param, R>): JustFunction<Param, R>
  } & (Param extends JustEmpty ? {
    defineArgs<A extends JustEmpty>(): A
  } : {
    defineArgs<A extends Param>(...args: A): A
  })
}

export type JustCommand<
  Params extends JustValues = JustEmpty,
  R extends JustValues = JustEmpty
> = JustCommand.Base<Params, R> & {
  connect(param: [ctx: CommandsContext & Partial<KeyboardContext>, handler?: (...args: Params) => R]): void,
}

export type JustCommand_WithDefault<
  Params extends JustValues = JustEmpty,
  R extends JustValues = JustEmpty
> = JustCommand.Base<Params, R> & {
  handler: JustFunction<Params, R>,
  connect(param: [ctx: CommandsContext & Partial<KeyboardContext>, handler?: (...args: Params) => R]): void,
}

export namespace Command {
  export type Base<
    Params extends any[] = [],
    R = void
  > = {
    (...args: Params): R,
    id: string,
    defineHandler(handler: (...args: Params) => R): (...args: Params) => R,
    defineArgs<A extends Params>(...args: A): A
  }
}

export type Command<
  Params extends any[] = [],
  R = void
> = Command.Base<Params, R> & {
  /**
   * Connects a command to the app context.
   *
   * If `handler` is provided,
   * the command function can be called directly which will invoke the command.
   *
   * If contribution and/or keybindings are defined in the command,
   * They will also be registered automatically.
   *
   * If the command is defined with string, i.e. `command('name',...)`,
   * it will not be added to contribution.
   * It's a shortcut so that local commands can also use `connect()` to setup itself.
   *
   * If you want the command to be available outside (i.e. register to contributions),
   * use the object form `command({...}, ...)`.
   */
  connect(ctx: CommandsContext & Partial<KeyboardContext>, handler?: (...args: Params) => R): void,
}

export type Command_WithDefault<
  Params extends any[] = [],
  R = void
> = Command.Base<Params, R> & {
  handler: (...args: Params) => R,
  /**
   * Connects a command to the app context.
   *
   * After calling this,
   * the command function can be called directly which will invoke the command.
   *
   * If contribution and/or keybindings are defined in the command,
   * They will also be registered automatically.
   *
   * If the command is defined with string, i.e. `command('name',...)`,
   * it will not be added to contribution.
   * It's a shortcut so that local commands can also use `connect()` to setup itself.
   *
   * If you want the command to be available outside (i.e. register to contributions),
   * use the object form `command({...}, ...)`.
   *
   * @param handler overrides the default handler.
   * This is useful if the plugin wants to provide a different implementation.
   * e.g. implementation for specific platform.
   */
  connect(ctx: CommandsContext & Partial<KeyboardContext>, handler?: (...args: Params) => R): void,
}
