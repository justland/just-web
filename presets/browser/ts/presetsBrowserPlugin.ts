import browserPlugin, { BrowserOptions } from '@just-web/browser'
import browserPreferencesPlugin from '@just-web/browser-preferences'
import type { CommandsContext } from '@just-web/commands'
import historyPlugin, { HistoryOptions } from '@just-web/history'
import type { KeyboardContext } from '@just-web/keyboard'
import type { LogContext } from '@just-web/log'
import { AppBaseContext, definePlugin, PluginContext } from '@just-web/types'

export type { ReadonlyErrorStore } from '@just-web/browser'
export type { BrowserHistory } from 'history'

const presetsBrowserPlugin = definePlugin((options?: BrowserOptions & HistoryOptions) => ({
  name: '@just-web/presets-browser',
  init: (ctx: AppBaseContext & LogContext & CommandsContext & Partial<KeyboardContext>) => {
    const [browser] = browserPlugin(options).init(ctx)
    browserPreferencesPlugin().init(ctx)
    const [history] = historyPlugin(options).init(ctx)
    return [{
      ...browser,
      ...history
    }]
  }
}))

export type PresetsBrowserContext = PluginContext<typeof presetsBrowserPlugin>

export default presetsBrowserPlugin
