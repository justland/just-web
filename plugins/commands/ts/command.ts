import { KeyBindingContribution } from '@just-web/keyboard'
import { getLogger } from '@just-web/log'
import type { JustEmpty, JustFunction, JustValues } from 'just-func'
import type { Command, CommandContribution, Command_WithDefault, HandlerRegistry, JustCommand, JustCommand_WithDefault } from './types'

/**
* Creates a command with a default handler
*/
export function justCommand<
  Param extends JustValues = JustValues,
  R extends JustValues = JustEmpty
>(info: CommandContribution & KeyBindingContribution & { handler: JustFunction<Param, R> })
  : JustCommand_WithDefault<Param, R>
/**
* Creates a command without default handler.
*/
export function justCommand<
  Param extends JustValues = JustValues,
  R extends JustValues = JustEmpty
>(info: CommandContribution & KeyBindingContribution): JustCommand<Param, R>
/**
* Creates a command without default handler.
*/
export function justCommand<
  Param extends JustValues = JustEmpty,
  R extends JustValues = JustEmpty
>(id: string): JustCommand<Param, R>
export function justCommand(idOrInfo: any): any {
  return buildJustCommand(typeof idOrInfo === 'string' ? { id: idOrInfo } : idOrInfo)
}

function buildJustCommand<H extends JustFunction>(info: CommandContribution & KeyBindingContribution & { handler?: H }) {
  let registry: HandlerRegistry
  type Params = Parameters<H>
  type R = ReturnType<H>
  const id = info.id

  return Object.assign(function (...args: Params) {
    if (!registry) return getLogger('@just-web/log').error(`cannot call '${id}' before register().`)
    return registry.invoke(id, ...args)
  }, {
    ...info,
    register([handlers, hdr]: [handlers: HandlerRegistry, hdr: (...args: Params) => R]) {
      registry = handlers
      registry.register(id, hdr ?? info.handler)
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
  return buildCommand(typeof idOrInfo === 'string' ? { id: idOrInfo } : idOrInfo, handler)
}

function buildCommand<
  Params extends any[] = [],
  R = void
>(info: CommandContribution & KeyBindingContribution, handler?: (...args: Params) => R) {
  let registry: HandlerRegistry
  const id = info.id

  return Object.assign(function (...args: Params) {
    if (!registry) return getLogger('@just-web/log').error(`cannot call '${id}' before register().`)
    return registry.invoke(id, ...args)
  }, {
    ...info,
    handler,
    register(handlers: HandlerRegistry, hdr: (...args: Params) => R) {
      registry = handlers
      registry.register(id, hdr ?? handler)
    },
    defineHandler(handler: (...args: Params) => R) { return handler },
    defineArgs(...args: Params) { return args }
  })
}
