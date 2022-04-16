import { AppContext, Store } from '@just-web/app'
import { RoutesContext } from '@just-web/routes'

export interface AppStore {
  app: AppContext & RoutesContext
}

let s: Store<AppStore>

export function setStore(store: Store<AppStore>) {
  s = store
}

export function getStore() {
  return s
}
