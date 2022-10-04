import type { ReadonlyStore } from '@just-web/states'

export interface ReadonlyErrorStore extends ReadonlyStore<Error[]> { }

export interface BrowserContext {
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
