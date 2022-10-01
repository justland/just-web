
import { ContributionsContext } from '@just-web/contributions'
import { LogContext } from '@just-web/log'
import { definePlugin } from '@just-web/types'
import { CommandRegistry, commandRegistry } from './commandRegistry'

export * from './commandRegistry'
export type { Command } from './types'

export type CommandsContext = {
  commands: CommandRegistry
}

export type CommandsOptions = { commands?: commandRegistry.Options }

export namespace createCommandsContext {
  export type Context = {
    options?: CommandsOptions
  } & LogContext & ContributionsContext
}

export default definePlugin({
  name: '@just-web/commands',
  init: (ctx: createCommandsContext.Context): [CommandsContext] => {
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
  }
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
  return { commands: commandRegistry(ctx, ctx.options?.commands) }
}
