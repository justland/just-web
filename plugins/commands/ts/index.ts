import type { ContributionsContext } from '@just-web/contributions'
import type { LogContext } from '@just-web/log'
import { definePlugin } from '@just-web/types'
import { justEvent } from '@unional/events-plus'
import { commandRegistry } from './commandRegistry'

export * from './commandRegistry'
export type { Command } from './types'

export type CommandsOptions = { commands?: commandRegistry.Options }

export namespace createCommandsContext {
  export type Context = LogContext & ContributionsContext
}

export const showCommandPalette = justEvent('just-web.showCommandPalette')

const plugin = definePlugin((options?: CommandsOptions) => ({
  name: '@just-web/commands',
  init: (ctx: createCommandsContext.Context) => {
    ctx.log.notice('init')
    ctx.contributions.commands.add({
      command: showCommandPalette.type,
      commandPalette: false
    })
    ctx.contributions.keyBindings.add({
      command: showCommandPalette.type,
      key: 'ctrl+p',
      mac: 'cmd+p'
    })
    const registry = commandRegistry(ctx, options?.commands)
    return [{
      commands: Object.assign(registry, {
        showCommandPalette() { return registry.invoke(showCommandPalette.type) }
      })
    }]
  }
}))

export type CommandsContext = ReturnType<ReturnType<typeof plugin>['init']>[0]

export default plugin
