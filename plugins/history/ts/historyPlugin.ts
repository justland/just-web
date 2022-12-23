import { definePlugin } from '@just-web/types'
import { createBrowserHistory, History } from 'history'
import type { HistoryContext } from './types.js'

export type HistoryOptions = {
  history: History
}

/**
 * Plugin for `history` package.
 * By default, it uses `createBrowserHistory()`.
 * You can pass your own `history` instance to the plugin options.
 */
const historyPlugin = definePlugin((options?: HistoryOptions) => ({
  name: '@just-web/history',
  init: (): [HistoryContext] => {
    return [{ history: options?.history ?? createBrowserHistory() }]
  }
}))

export default historyPlugin
