import type { KeyboardContext } from '@just-web/keyboard'
import type { LogContext } from '@just-web/log'
import { definePlugin } from '@just-web/types'
import { justEvent } from '@unional/events-plus'
import { AnyFunction } from 'type-plus'
import { commandRegistry } from './commandRegistry'
import { commandContributionRegistry } from './contributions'
import { CommandContribution } from './types'

export * from './commandRegistry'
export * from './formatCommand'
export type { Command, CommandContribution } from './types'

export const showCommandPalette = justEvent('just-web.showCommandPalette')

export type CommandsOptions = {
  commands?: {
    commands?: Record<string, AnyFunction>,
    contributions?: Array<CommandContribution>
  }
}

const plugin = definePlugin((options?: CommandsOptions) => ({
  name: '@just-web/commands',
  init: (ctx: LogContext & KeyboardContext) => {
    ctx.keyboard.keyBindings.add({
      command: showCommandPalette.type,
      key: 'ctrl+p',
      mac: 'cmd+p'
    })

    const commands = commandRegistry(ctx, options?.commands?.commands)
    const contributions = commandContributionRegistry(ctx, options?.commands?.contributions)

    contributions.add({
      command: showCommandPalette.type,
      commandPalette: false
    })

    return [{
      commands: {
        commands,
        contributions,
        showCommandPalette() { return commands.invoke(showCommandPalette.type) }
      }
    }]
  }
}))

export type CommandsContext = ReturnType<ReturnType<typeof plugin>['init']>[0]

export default plugin
