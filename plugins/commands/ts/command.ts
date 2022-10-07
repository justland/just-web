import { AnyFunction } from 'type-plus'
import { CommandsContext } from '.'

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
