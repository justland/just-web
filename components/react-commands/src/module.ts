import { Context } from '@just-web/contexts'
import { createStore } from './store'

export function activate(context: Context) {
  const store = createStore(context)
  context.commands.registry.register('just-web.showCommandPalette', () => {
    store.update(s => { s.openCommandPalette = true })
  })
}
