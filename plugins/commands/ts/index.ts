import type { KeyboardContext } from '@just-web/keyboard'
import type { LogContext } from '@just-web/log'
import { definePlugin } from '@just-web/types'
import type { AnyFunction } from 'type-plus'
import { command } from './command'
import { contributionRegistry } from './contributions'
import { handlerRegistry } from './handlers'
import type { CommandContribution, CommandsContext } from './types'

export * from './command'
export * from './formatCommand'
export type { CommandContribution, CommandHandler, CommandsContext, ContributionRegistry, HandlerRegistry, Command } from './types'

export const showCommandPalette = command({
  id: 'just-web.showCommandPalette',
  commandPalette: false,
  key: 'ctrl+p',
  mac: 'cmd+p'
})

export type CommandsOptions = {
  commands?: {
    contributions?: Array<CommandContribution>,
    handlers?: Record<string, AnyFunction>,
  }
}

const commandsPlugin = definePlugin((options?: CommandsOptions) => ({
  name: '@just-web/commands',
  init: (ctx: LogContext & Partial<KeyboardContext>): [CommandsContext] => {
    const contributions = contributionRegistry(ctx, options?.commands?.contributions)
    const handlers = handlerRegistry(ctx, options?.commands?.handlers)

    contributions.add(showCommandPalette)
    ctx.keyboard?.keyBindingContributions.add(showCommandPalette)

    return [{
      commands: {
        contributions,
        handlers,
        showCommandPalette
      }
    }]
  }
}))

export default commandsPlugin
