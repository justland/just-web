import { definePlugin, AppBaseContext, PluginContext } from '@just-web/types'
import browserPlugin, { BrowserOptions } from '@just-web/browser'
import type { CommandsContext } from '@just-web/commands'
import type { KeyboardContext } from '@just-web/keyboard'
import browserPreferencesPlugin from '@just-web/browser-preferences'
import type { LogContext } from '@just-web/log'
import { BrowserHistoryOptions, createBrowserHistory } from 'history'

export const presetsBrowserPlugin = definePlugin((options?: BrowserOptions & { history: BrowserHistoryOptions }) => ({
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
