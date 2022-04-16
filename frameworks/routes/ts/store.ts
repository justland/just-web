import { Context, createStore, Store } from '@just-web/contexts'
import { record } from 'type-plus'


export interface Route {
  (): void
}

export interface ModuleStore {
  context: Context,
  routes: Record<string, Route>
}

let store: Store<ModuleStore>

export function setStore(context: Context) {
  store = createStore<ModuleStore>({
    context,
    routes: record()
  })
}

export function getStore() {
  return store
}

