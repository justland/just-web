import { Context, createStore } from '@just-web/contexts'
import { setStore, State } from './store'

export function activate(context: Context) {
  const store = setStore(createStore<State>({
    context,
    openCommandPalette: false
  }))
  context.commands.register(
    'just-web.showCommandPalette',
    () => store.update(s => { s.openCommandPalette = true })
  )
}
