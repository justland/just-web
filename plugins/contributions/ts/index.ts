export * from './commands'
export * from './keyBindings'
export * from './types'

import { LogContext } from '@just-web/log'
import { definePlugin } from '@just-web/types'
import { commandContributionRegistry } from './commands'
import { keyBindingRegistry } from './keyBindings'

export type ContributionsOptions = {
  contributions?: {
    commands?: commandContributionRegistry.Options,
    keyBindings?: keyBindingRegistry.Options
  }
}

export default definePlugin((options?: ContributionsOptions) => ({
  name: '@just-web/contributions',
  init: (ctx: LogContext) => {
    ctx.log.notice('init')
    const commands = commandContributionRegistry(ctx, options?.contributions?.commands)
    const keyBindings = keyBindingRegistry(ctx, options?.contributions?.keyBindings)
    return [{ contributions: { commands, keyBindings } }]
  }
}))
