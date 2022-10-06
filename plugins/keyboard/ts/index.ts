
import { LogContext } from '@just-web/log'
import { definePlugin } from '@just-web/types'
import { keyBindingRegistry } from './keyBindings'

export * from './keyBindings'

export type KeyboardOptions = {
  keyboard?: {
    keyBindings?: keyBindingRegistry.Options
  }
}

const plugin = definePlugin((options?: KeyboardOptions) => ({
  name: '@just-web/contributions',
  init: (ctx: LogContext) => {
    const keyBindings = keyBindingRegistry(ctx, options?.keyboard?.keyBindings)

    return [{ keyboard: { keyBindings } }]
  }
}))

export type KeyboardContext = ReturnType<ReturnType<typeof plugin>['init']>[0]

export default plugin
