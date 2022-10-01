import { definePlugin } from '@just-web/types'
import { isType } from 'type-plus'
import { startKeyBindings } from './keyBindings'
import type { BrowserContributionsInitContext, BrowserContributionsStartContext } from './types'

export { BrowserContributionsInitContext, BrowserContributionsStartContext }

export default definePlugin({
  name: '@just-web/browser-contributions',
  init: (ctx: BrowserContributionsInitContext) => [undefined, ctx],
  start: async (ctx: BrowserContributionsStartContext) => {
    const log = ctx.log.getLogger('@just-web/browser-contributions')
    log.trace('start')
    if (isType<startKeyBindings.Param>(ctx, ctx => !!ctx.contributions)) {
      startKeyBindings(ctx)
    }
  }
})
