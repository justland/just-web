import { Context, Store } from '@just-web/app'
import { RoutesConfigOptions } from './types'

export interface Route {
  (): void
}

export interface ModuleStore {
  context: Context,
  config: RoutesConfigOptions,
  routes: Record<string, Route>
}

let store: Store<ModuleStore>

export function setStore(s: Store<ModuleStore>) {
  store = s
}

export function getStore() {
  return store
}

