import { Context, Store } from '@just-web/app'

export interface State {
  context: Context,
  openCommandPalette: boolean
}

let store: Store<State>

export function setStore(s: Store<State>) {
  return store = s
}

export function getStore() {
  return store
}
