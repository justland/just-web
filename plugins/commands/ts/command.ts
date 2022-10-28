import { KeyBindingContribution, KeyboardContext } from '@just-web/keyboard'
import { getLogger } from '@just-web/log'
import type { JustEmpty, JustFunction, JustValues } from 'just-func'
import type { Command, CommandContribution, CommandsContext, Command_WithDefault, JustCommand, JustCommand_WithDefault } from './types'

/**
* Creates a `just` command with default handler
*/
export function justCommand<
  Params extends JustValues = JustValues,
  R extends JustValues = JustEmpty
>(param: [idOrInfo: CommandContribution & KeyBindingContribution | string, handler: JustFunction<Params, R>])
  : JustCommand_WithDefault<Params, R>
/**
 * Creates a command without default handler.
 */
export function justCommand<
  Params extends JustValues = JustEmpty,
  R extends JustValues = JustEmpty
>(param: [idOrInfo: CommandContribution & KeyBindingContribution | string]): JustCommand<Params, R>
export function justCommand<
  Params extends JustValues = JustEmpty,
  R extends JustValues = JustEmpty
>([idOrInfo, handler]: [idOrInfo: CommandContribution & KeyBindingContribution | string, handler?: JustFunction<Params, R>]): any {
  const withIdString = typeof idOrInfo === 'string'
  const info = typeof idOrInfo === 'string' ? { id: idOrInfo } : idOrInfo
  let ctx: CommandsContext & Partial<KeyboardContext>

  return Object.assign(function (...args: Params) {
    if (!ctx) return getLogger('@just-web/log').error(`cannot call '${info.id}' before connect().`)
    return ctx.commands.handlers.invoke(info.id, ...args)
  }, {
    ...info,
    handler,
    connect([context, hdr]: [context: CommandsContext & Partial<KeyboardContext>, hdr?: JustFunction<Params, R>]) {
      ctx = context
      hdr = hdr ?? handler
      if (hdr) {
        ctx.commands.handlers.register(info.id, hdr)
      }

      if (withIdString) return

      ctx.commands.contributions.add(info)
      if (ctx.keyboard && (info.key || info.mac)) {
        ctx.keyboard.keyBindingContributions.add(info)
      }
    },
    defineHandler(handler: (...args: Params) => R) { return handler },
    defineArgs(...args: Params) { return args },
  })
}

/**
 * Creates a public command with default handler that will be added to `contributions`.
 */
export function command<
  Params extends any[] = [],
  R = void
>(info: CommandContribution & KeyBindingContribution, handler: (...args: Params) => R): Command_WithDefault<Params, R>
/**
 * Creates a public command that will be added to `contributions`.
 */
export function command<
  Params extends any[] = [],
  R = void
>(info: CommandContribution & KeyBindingContribution): Command<Params, R>
/**
 * Creates a local command with a default handler.
 *
 * @param id `ID` of the command.
 * It should be unique across the application.
 * It should follow the `<plugin>.<name>` pattern.
 *
 * For example: `just-web.showCommandPalette`
 * The resulting command function will also have this as the name.
 */
export function command<
  Params extends any[] = [],
  R = void
>(id: string, handler: (...args: Params) => R): Command_WithDefault<Params, R>
/**
 * Creates a local command without default handler.
 *
 * @param id `ID` of the command.
 * It should be unique across the application.
 * It should follow the `<plugin>.<name>` pattern.
 *
 * For example: `just-web.showCommandPalette`
 * The resulting command function will also have this as the name.
 */
export function command<
  Params extends any[] = [],
  R = void
>(id: string): Command<Params, R>
export function command<
  Params extends any[] = [],
  R = void
>(idOrInfo: any, handler?: (...args: Params) => R): any {
  const withIdString = typeof idOrInfo === 'string'
  const info = typeof idOrInfo === 'string' ? { id: idOrInfo } : idOrInfo
  let ctx: CommandsContext & Partial<KeyboardContext>

  const fn = Object.defineProperty(function (...args: Params) {
    if (!ctx) return getLogger('@just-web/log').error(`cannot call '${info.id}' before connect().`)
    return ctx.commands.handlers.invoke(info.id, ...args)
  }, 'name', {
    enumerable: false,
    writable: false,
    configurable: false,
    value: info.id
  })

  return Object.assign(fn, {
    ...info,
    handler,
    connect(context: CommandsContext & Partial<KeyboardContext>, hdr?: (...args: Params) => R) {
      ctx = context
      hdr = hdr ?? handler
      if (hdr) {
        ctx.commands.handlers.register(info.id, hdr)
      }

      if (withIdString) return

      ctx.commands.contributions.add(info)
      if (ctx.keyboard && (info.key || info.mac)) {
        ctx.keyboard.keyBindingContributions.add(info)
      }
    },
    defineHandler(handler: (...args: Params) => R) { return handler },
    defineArgs(...args: Params) { return args }
  })
}
