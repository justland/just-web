import { LogContext } from '@just-web/log'
import { toReadonlyRegistry } from '@just-web/states'
import { defineInitialize } from '@just-web/types'
import { commandContributionRegistry } from './commands'
import { keyBindingRegistry } from './keyBindings'
import { ContributionsContext, ReadonlyContributionsContext } from './types'

export interface ContributionsContextOptions {
  commands?: commandContributionRegistry.Options,
  keyBindings?: keyBindingRegistry.Options
}

export const initialize = defineInitialize(async (ctx: LogContext & { options?: ContributionsContextOptions }) => {
  const commands = commandContributionRegistry(ctx, ctx.options?.commands)
  const keyBindings = keyBindingRegistry(ctx, ctx.options?.keyBindings)
  return [{ contributions: { commands, keyBindings } }]
})

export function createContributionsContext(
  context: LogContext,
  options?: ContributionsContextOptions): ContributionsContext {
  const commands = commandContributionRegistry(context, options?.commands)
  const keyBindings = keyBindingRegistry(context, options?.keyBindings)
  return { contributions: { commands, keyBindings } }
}

export function toReadonlyContributionsContext({ contributions }: ContributionsContext): ReadonlyContributionsContext {
  return {
    contributions: {
      commands: toReadonlyRegistry(contributions.commands),
      keyBindings: toReadonlyRegistry(contributions.keyBindings)
    }
  }
}
