import type { AnyFunction } from 'type-plus'
import type { Command, CommandsContext, Command_WithDefault } from './types'

/**
 * Creates a command with a default handler
 */
export function command<H extends AnyFunction>(type: string, defaultHandler: H): Command_WithDefault<H>
/**
 * Creates a command without default handler.
 */
export function command<H extends AnyFunction>(type: string): Command<H>
export function command<H extends AnyFunction>(type: string, defaultHandler?: H): any {
  let ctx: CommandsContext
  type Params = Parameters<H>
  type R = ReturnType<H>

  return Object.assign(function (...args: Params) {
    if (ctx) return ctx.commands.handlers.invoke(type, ...args)
  }, {
    type,
    defaultHandler,
    connect(context: CommandsContext, hdr: (...args: Params) => R) {
      ctx = context
      ctx.commands.handlers.register(type, defaultHandler ?? hdr)
    },
    defineHandler(handler: (...args: Params) => R) { return handler },
    defineArgs(...args: Params) { return args }
  })
}
