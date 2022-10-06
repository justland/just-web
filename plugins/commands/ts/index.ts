import type { KeyboardContext } from '@just-web/keyboard'
import type { LogContext } from '@just-web/log'
import { definePlugin } from '@just-web/types'
import { justEvent } from '@unional/events-plus'
import { AnyFunction } from 'type-plus'
import { contributionRegistry } from './contributions'
import { handlerRegistry } from './handlers'
import { CommandContribution } from './types'

export * from './formatCommand'
export type { Command, CommandContribution } from './types'

export const showCommandPalette = justEvent('just-web.showCommandPalette')

export type CommandsOptions = {
  commands?: {
    contributions?: Array<CommandContribution>,
    handlers?: Record<string, AnyFunction>,
  }
}

const plugin = definePlugin((options?: CommandsOptions) => ({
  name: '@just-web/commands',
  init: (ctx: LogContext & KeyboardContext) => {
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

export type CommandsContext = ReturnType<ReturnType<typeof plugin>['init']>[0]

export default plugin
