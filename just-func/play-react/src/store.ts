import { AppContext } from '@just-web/app'

export interface AppStore {
  app: AppContext
}

let s: AppStore

export function setStore(store: AppStore) {
  s = store
}

export function getStore() {
  return s
}
