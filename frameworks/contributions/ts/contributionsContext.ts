import { LogContext } from '@just-web/log'
import { toReadonlyRegistry } from '@just-web/states'
import { defineActivate } from '@just-web/types'
import { commandContributionRegistry } from './commands'
import { keyBindingRegistry } from './keyBindings'
import { ContributionsContext, ReadonlyContributionsContext } from './types'

export interface ContributionsContextOptions {
  commands?: commandContributionRegistry.Options['commands'],
  keyBindings?: keyBindingRegistry.Options['keyBindings']
}

export const activate = defineActivate(async (ctx: LogContext & { options?: ContributionsContextOptions }) => {
  const commands = commandContributionRegistry(ctx, ctx.options)
  const keyBindings = keyBindingRegistry(ctx, ctx.options)
  return [{ commands, keyBindings }]
})

export function createContributionsContext(
  context: LogContext,
  options?: ContributionsContextOptions): ContributionsContext {
  const commands = commandContributionRegistry(context, options)
  const keyBindings = keyBindingRegistry(context, options)
  return { commands, keyBindings }
}

export function toReadonlyContributionsContext(module: ContributionsContext): ReadonlyContributionsContext {
  return {
    commands: toReadonlyRegistry(module.commands),
    keyBindings: toReadonlyRegistry(module.keyBindings)
  }
}
