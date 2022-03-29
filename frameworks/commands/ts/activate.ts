import { store } from './store'

/**
 * Activate function will be called by `@just-web/app` at load time.
 */
export function activate() {
  return { onChange: store.onChange.bind(store) }
}

