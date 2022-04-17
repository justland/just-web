import { Context, createStore } from '@just-web/app'
import { log } from './log'
import { setStore, State } from './store'

export async function activate(context: Context) {
  log.notice('activate')
  const store = setStore(createStore<State>({
    context,
    openCommandPalette: false
  }))
  context.commands.register(
    'just-web.showCommandPalette',
    () => store.update(s => { s.openCommandPalette = true })
  )
}
