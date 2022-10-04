export * from './commands'
export * from './keyBindings'

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

const plugin = definePlugin((options?: ContributionsOptions) => ({
  name: '@just-web/contributions',
  init: (ctx: LogContext) => {
    const commands = commandContributionRegistry(ctx, options?.contributions?.commands)
    const keyBindings = keyBindingRegistry(ctx, options?.contributions?.keyBindings)
    return [{ contributions: { commands, keyBindings } }]
  }
}))

export type ContributionsContext = ReturnType<ReturnType<typeof plugin>['init']>[0]

export default plugin
