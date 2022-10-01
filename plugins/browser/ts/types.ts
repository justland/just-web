import { ReadonlyErrorStore } from './errorStore'
import { isMac } from './os'

export interface BrowserContext {
  os: {
    isMac: typeof isMac
  },
  browser: {
    errors: ReadonlyErrorStore
  }
}

export type BrowserOptions = {
  browser?: {
    /**
     * Prevents the default event handler of `onerror` to be fired.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
     */
    preventDefault?: boolean
  }
}

export type BrowserInitContext = {
  options?: BrowserOptions
}
