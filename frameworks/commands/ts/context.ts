import { ContributionsContext } from '@just-web/contributions'
import { LogContext } from '@just-web/log'
import { defineInitialize } from '@just-web/types'
import { CommandRegistry, commandRegistry, ReadonlyCommandRegistry, toReadonlyCommandRegistry } from './commandRegistry'

export interface CommandsContext extends CommandRegistry {
}

export interface ReadonlyCommandsContext extends ReadonlyCommandRegistry {
}

export interface CommandsContextOptions extends commandRegistry.Options { }
export namespace createCommandsContext {
  export type Context = {
    contributions: ContributionsContext
  } & LogContext
}

export const initialize = defineInitialize(async (ctx: createCommandsContext.Context & { options?: CommandsContextOptions }) => {
  const log = ctx.log.getLogger('@just-web/commands')
  log.trace('create context')
  ctx.contributions.commands.add({
    command: 'just-web.showCommandPalette',
    commandPalette: false
  })
  ctx.contributions.keyBindings.add({
    command: 'just-web.showCommandPalette',
    key: 'ctrl+p',
    mac: 'cmd+p'
  })
  return [{ ...commandRegistry(ctx, ctx.options) }]
})

export function createCommandsContext(
  { contributions, log }: createCommandsContext.Context,
  options?: CommandsContextOptions
): CommandsContext {
  const logger = log.getLogger('@just-web/commands')
  logger.trace('create context')
  contributions.commands.add({
    command: 'just-web.showCommandPalette',
    commandPalette: false
  })
  contributions.keyBindings.add({
    command: 'just-web.showCommandPalette',
    key: 'ctrl+p',
    mac: 'cmd+p'
  })
  return { ...commandRegistry({ log }, options) }
}

export function toReadonlyCommandsContext(module: CommandsContext): ReadonlyCommandsContext {
  return {
    ...module,
    ...toReadonlyCommandRegistry(module)
  }
}
