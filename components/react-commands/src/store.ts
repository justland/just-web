import { Context, Store } from '@just-web/contexts'

export interface State {
  context: Context,
  openCommandPalette: boolean
}

let store: Store<State>

export function createStore(context: Context) {
  return store = context.states.createStore<State>({
    context,
    openCommandPalette: false
  })
}

export function getStore() {
  return store
}
