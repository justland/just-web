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
  let ctx: CommandsContext & KeyboardContext

  return Object.assign(function (...args: Params) {
    if (!ctx) return getLogger('@just-web/log').error(`cannot call '${info.id}' before connect().`)
    return ctx.commands.handlers.invoke(info.id, ...args)
  }, {
    ...info,
    handler,
    connect([context, hdr]: [context: CommandsContext & KeyboardContext, hdr?: (...args: Params) => R]) {
      ctx = context
      if (handler || hdr) {
        ctx.commands.handlers.register(info.id, hdr ?? handler!)
      }

      if (withIdString) return

      ctx.commands.contributions.add(info)
      if (info.key || info.mac) {
        ctx.keyboard.keyBindingContributions.add(info)
      }
    },
    defineHandler(handler: (...args: Params) => R) { return handler },
    defineArgs(...args: Params) { return args },
  })
}

/**
* Creates a command with a default handler
*/
export function command<
  Params extends any[] = [],
  R = void
>(info: CommandContribution & KeyBindingContribution, handler: (...args: Params) => R): Command_WithDefault<Params, R>
export function command<
  Params extends any[] = [],
  R = void
>(info: CommandContribution & KeyBindingContribution): Command<Params, R>
/**
 * Creates a command with a default handler
 */
export function command<
  Params extends any[] = [],
  R = void
>(id: string, handler: (...args: Params) => R): Command_WithDefault<Params, R>
/**
 * Creates a command without default handler.
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

  return Object.assign(function (...args: Params) {
    if (!ctx) return getLogger('@just-web/log').error(`cannot call '${info.id}' before connect().`)
    return ctx.commands.handlers.invoke(info.id, ...args)
  }, {
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
