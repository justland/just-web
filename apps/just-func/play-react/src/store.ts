import { AppContext, createStore, Store } from '@just-web/app'
import { RoutesContext } from '@just-web/routes'


export interface App extends AppContext, RoutesContext { }

export interface AppStore<A = App> {
  app: A
}

let s: Store<AppStore<any>>

export function createAppStore<A extends App = App>(app: A) {
  return s = createStore<AppStore<A>>({ app })
}

export function getStore<A extends App = App>() {
  return s as Store<AppStore<A>>
}

export function getStoreValue<A extends App = App>() {
  return s.get() as AppStore<A>
}
