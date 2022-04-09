import { Context, Store } from '@just-web/contexts'

export interface State {
  openCommandPalette: boolean
}

let store: Store<State>

export function createStore(context: Context) {
  store = context.states.createStore<State>({
    openCommandPalette: false
  })
}

export function getStore() {
  return store
}
