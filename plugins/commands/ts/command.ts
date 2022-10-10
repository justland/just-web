import { KeyBindingContribution } from '@just-web/keyboard'
import { getLogger } from '@just-web/log'
import type { JustEmpty, JustFunction, JustValues } from 'just-func'
import type { JustCommand, CommandContribution, JustCommand_WithDefault, HandlerRegistry } from './types'

/**
* Creates a command with a default handler
*/
export function justCommand<
  Param extends JustValues = JustValues,
  R extends JustValues = JustEmpty
>(
  info: CommandContribution & KeyBindingContribution & { handler: JustFunction<Param, R> }
): JustCommand_WithDefault<Param, R>
export function justCommand<
  Param extends JustValues = JustValues,
  R extends JustValues = JustEmpty
>(
  info: CommandContribution & KeyBindingContribution
): JustCommand_WithDefault<Param, R>
/**
* Creates a command without default handler.
*/
export function justCommand<
  Param extends JustValues = JustEmpty,
  R extends JustValues = JustEmpty
>(id: string): JustCommand<Param, R>
export function justCommand(idOrInfo: any): any {
  return buildCommand(typeof idOrInfo === 'string' ? { id: idOrInfo } : idOrInfo)
}

function buildCommand<H extends JustFunction>(info: CommandContribution & KeyBindingContribution & { handler?: H }) {
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
