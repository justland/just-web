import { ContributionsContext } from '@just-web/contributions'
import { LogContext } from '@just-web/log'
import { defineInitialize } from '@just-web/types'
import { CommandRegistry, commandRegistry, ReadonlyCommandRegistry, toReadonlyCommandRegistry } from './commandRegistry'

export interface CommandsContext extends CommandRegistry {
}

export interface ReadonlyCommandsContext extends ReadonlyCommandRegistry {
}

export type CommandsOptions = { commands?: commandRegistry.Options }

export namespace createCommandsContext {
  export type Context = {
    options?: CommandsOptions
  } & LogContext & ContributionsContext
}

export const initialize = defineInitialize(async (ctx: createCommandsContext.Context) => {
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
  return [{ commands: commandRegistry(ctx, ctx.options?.commands) }]
})

export function createCommandsContext(ctx: createCommandsContext.Context): CommandsContext {
  const logger = ctx.log.getLogger('@just-web/commands')
  logger.trace('create context')
  ctx.contributions.commands.add({
    command: 'just-web.showCommandPalette',
    commandPalette: false
  })
  ctx.contributions.keyBindings.add({
    command: 'just-web.showCommandPalette',
    key: 'ctrl+p',
    mac: 'cmd+p'
  })
  return { ...commandRegistry(ctx, ctx.options?.commands) }
}

export function toReadonlyCommandsContext(module: CommandsContext): ReadonlyCommandsContext {
  return {
    ...module,
    ...toReadonlyCommandRegistry(module)
  }
}
