import { KeyBindingContribution, KeyboardContext } from '@just-web/keyboard'
import { AnyFunction, isType } from 'type-plus'
import type { Command, CommandContribution, CommandsContext, Command_K, Command_KWithDefault, Command_WithDefault } from './types'

/**
 * Creates a command with a default handler
 */
export function command<H extends AnyFunction>(id: string, defaultHandler: H): Command_WithDefault<H>
/**
* Creates a command with a default handler
*/
export function command<H extends AnyFunction>(info: CommandContribution, defaultHandler: H): Command_WithDefault<H>
/**
 * Creates a command with a default handler
 */
export function command<H extends AnyFunction>(info: CommandContribution & KeyBindingContribution, defaultHandler: H): Command_KWithDefault<H>
/**
* Creates a command without default handler.
*/
export function command<H extends AnyFunction>(id: string): Command<H>
export function command<H extends AnyFunction>(info: CommandContribution): Command<H>
export function command<H extends AnyFunction>(info: CommandContribution & KeyBindingContribution): Command_K<H>
export function command<H extends AnyFunction>(idOrInfo: any, defaultHandler?: H): any {
  let ctx: CommandsContext & Partial<KeyboardContext>
  type Params = Parameters<H>
  type R = ReturnType<H>

  const id = typeof idOrInfo === 'string' ? idOrInfo : idOrInfo.id
  return Object.assign(function (...args: Params) {
    if (ctx) return ctx.commands.handlers.invoke(id, ...args)
  }, {
    id,
    defaultHandler,
    connect(context: CommandsContext & KeyboardContext, hdr: (...args: Params) => R) {
      ctx = context
      ctx.commands.handlers.register(id, hdr ?? defaultHandler)
      if (isType<CommandContribution>(idOrInfo, t => t.category || t.commandPalette || t.description || t.icon || t.name)) {
        ctx.commands.contributions.add(idOrInfo)
      }
      if (ctx.keyboard && isType<KeyBindingContribution>(idOrInfo, t => t.key || t.mac)) {
        ctx.keyboard.keyBindingContributions.add(idOrInfo)
      }
    },
    defineHandler(handler: (...args: Params) => R) { return handler },
    defineArgs(...args: Params) { return args }
  })
}
