import type { CommandsContext } from '@just-web/commands'
import type { ContributionsContext } from '@just-web/contributions'
import type { LogContext } from '@just-web/log'
import type { OSContext } from '@just-web/os'
import { definePlugin } from '@just-web/types'
import { isType } from 'type-plus'
import { startKeyBindings } from './keyBindings'

export default definePlugin(() => ({
  name: '@just-web/browser-contributions',
  init(ctx: LogContext & ContributionsContext & CommandsContext & OSContext) {
    return [undefined, ctx]
  },
  async start(ctx) {
    if (isType<Parameters<typeof startKeyBindings>[0]>(ctx, ctx => !!ctx.contributions)) {
      startKeyBindings(ctx)
    }
  }
}))
