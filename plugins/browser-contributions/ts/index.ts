import { definePlugin } from '@just-web/types'
import { isType } from 'type-plus'
import { startKeyBindings } from './keyBindings'
import type { BrowserContributionsInitContext, BrowserContributionsStartContext } from './types'

export { BrowserContributionsInitContext, BrowserContributionsStartContext }

export default definePlugin(() => ({
  name: '@just-web/browser-contributions',
  init: (ctx: BrowserContributionsInitContext) => {
    ctx.log.notice('init')
    return [undefined, ctx]
  },
  start: async (ctx) => {
    ctx.log.notice('start')
    if (isType<startKeyBindings.Param>(ctx, ctx => !!ctx.contributions)) {
      startKeyBindings(ctx)
    }
  }
}))
