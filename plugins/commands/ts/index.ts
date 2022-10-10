import type { KeyboardContext } from '@just-web/keyboard'
import type { LogContext } from '@just-web/log'
import { definePlugin } from '@just-web/types'
import type { AnyFunction } from 'type-plus'
import { justCommand } from './command'
import { contributionRegistry } from './contributions'
import { handlerRegistry } from './handlers'
import type { CommandContribution, CommandsContext } from './types'

export * from './command'
export * from './formatCommand'
export type {
  JustCommand as Command, CommandContribution, CommandHandler, CommandsContext, JustCommand_WithDefault as Command_WithDefault,
  ContributionRegistry, HandlerRegistry
} from './types'

export const justShowCommandPalette = justCommand({
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

const plugin = definePlugin((options?: CommandsOptions) => ({
  name: '@just-web/commands',
  init: (ctx: LogContext & KeyboardContext): [CommandsContext] => {
    ctx.keyboard.keyBindingContributions.add(justShowCommandPalette)

    const handlers = handlerRegistry(ctx, options?.commands?.handlers)
    const contributions = contributionRegistry(ctx, options?.commands?.contributions)

    contributions.add(justShowCommandPalette)
    justShowCommandPalette.register([handlers])
    return [{
      commands: {
        contributions,
        handlers,
        showCommandPalette: justShowCommandPalette
      }
    }]
  }
}))

export default plugin
