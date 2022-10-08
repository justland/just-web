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
export type {
  Command, CommandContribution, CommandHandler, CommandsContext, Command_WithDefault,
  ContributionRegistry, HandlerRegistry
} from './types'

export const showCommandPalette = command('just-web.showCommandPalette')

export type CommandsOptions = {
  commands?: {
    contributions?: Array<CommandContribution>,
    handlers?: Record<string, AnyFunction>,
  }
}

const plugin = definePlugin((options?: CommandsOptions) => ({
  name: '@just-web/commands',
  init: (ctx: LogContext & KeyboardContext): [CommandsContext] => {
    ctx.keyboard.keyBindingContributions.add({
      command: showCommandPalette.type,
      key: 'ctrl+p',
      mac: 'cmd+p'
    })

    const handlers = handlerRegistry(ctx, options?.commands?.handlers)
    const contributions = contributionRegistry(ctx, options?.commands?.contributions)

    contributions.add({
      command: showCommandPalette.type,
      commandPalette: false,
    })

    return [{
      commands: {
        contributions,
        handlers,
        showCommandPalette() { return handlers.invoke(showCommandPalette.type) }
      }
    }]
  }
}))

export default plugin
