import { Context } from '@just-web/contexts'
import { setContext } from './context'
import { createStore, getStore } from './store'
import { produce } from 'immer'
/**
 * right now this module does not need to be a plugin.
 * Doing this just as an plugin example
 */
export function activate(context: Context) {
  setContext(context)
  createStore(context)
  context.commands.registry.register('just-web.showCommandPalette', () => {
    const store = getStore()
    store.set(produce(store.get(), s => { s.openCommandPalette = true }))
  })
}
