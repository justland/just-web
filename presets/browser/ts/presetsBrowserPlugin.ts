import browserPlugin, { BrowserOptions } from '@just-web/browser'
import browserPreferencesPlugin from '@just-web/browser-preferences'
import type { CommandsContext } from '@just-web/commands'
import type { KeyboardContext } from '@just-web/keyboard'
import type { LogContext } from '@just-web/log'
import { AppBaseContext, definePlugin, PluginContext } from '@just-web/types'
import { BrowserHistoryOptions, createBrowserHistory } from 'history'

export type { ReadonlyErrorStore } from '@just-web/browser'
export type { BrowserHistory } from 'history'

const presetsBrowserPlugin = definePlugin((options?: BrowserOptions & { history: BrowserHistoryOptions }) => ({
  name: '@just-web/presets-browser',
  init: (ctx: AppBaseContext & LogContext & CommandsContext & KeyboardContext) => {
    const [{ browser }] = browserPlugin(options).init(ctx)
    browserPreferencesPlugin().init(ctx)
    return [{
      browser,
      history: createBrowserHistory(options?.history)
    }]
  }
}))

export type PresetsBrowserContext = PluginContext<typeof presetsBrowserPlugin>

export default presetsBrowserPlugin
