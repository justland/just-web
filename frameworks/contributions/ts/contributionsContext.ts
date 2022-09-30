import { LogContext } from '@just-web/log'
import { toReadonlyRegistry } from '@just-web/states'
import { defineInitialize } from '@just-web/types'
import { commandContributionRegistry } from './commands'
import { keyBindingRegistry } from './keyBindings'
import { ContributionsContext, ReadonlyContributionsContext } from './types'

export type ContributionsOptions = {
  contributions?: {
    commands?: commandContributionRegistry.Options,
    keyBindings?: keyBindingRegistry.Options
  }
}

export const initialize = defineInitialize(async (ctx: LogContext & { options?: ContributionsOptions }) => {
  const commands = commandContributionRegistry(ctx, ctx.options?.contributions?.commands)
  const keyBindings = keyBindingRegistry(ctx, ctx.options?.contributions?.keyBindings)
  return [{ contributions: { commands, keyBindings } }]
})

export function createContributionsContext(
  context: LogContext,
  options?: ContributionsOptions): ContributionsContext {
  const commands = commandContributionRegistry(context, options?.contributions?.commands)
  const keyBindings = keyBindingRegistry(context, options?.contributions?.keyBindings)
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
