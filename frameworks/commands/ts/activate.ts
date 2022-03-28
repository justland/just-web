import { createState } from '@just-web/states'
import { store } from './store'
import { Command } from './types'

/**
 * Activate function will be called by `@just-web/app` at load time.
 */
export function activate() {
  // TODO: handle when user uses ES5 only and does not support `Map`
  const [commands, setCommands, onChange] = createState<Map<string, Command>>(store.get())

  store.activate(commands, setCommands, onChange)
  return { onChange }
}

