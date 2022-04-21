import { AppContext, createStore, Store } from '@just-web/app'
import { RoutesContext } from '@just-web/routes'

export interface Doc {
  name: string,
  content: string
}

export interface DocView {
  type: 'doc',
  id: string,
  doc: Doc
}

export interface App extends AppContext, RoutesContext { }

export interface AppStore<A = App> {
  app: A,
  docs: Doc[],
  openedViews: DocView[],
  counter: number
}

let s: Store<AppStore<any>>

export function createAppStore<A extends App = App>(app: A) {
  return s = createStore<AppStore<A>>({
    app,
    docs: [],
    openedViews: [],
    counter: 0
  })
}

export function getStore<A extends App = App>() {
  return s as Store<AppStore<A>>
}

export function getStoreValue<A extends App = App>() {
  return s.get() as AppStore<A>
}
