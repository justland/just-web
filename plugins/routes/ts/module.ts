import { Context, createStore } from '@just-web/app'
import { record, requiredDeep } from 'type-plus'
import * as routes from './routes'
import { getStore, ModuleStore, setStore } from './store'
import { RoutesConfigOptions } from './types'

export interface RoutesContext {
  routes: typeof routes & {
    config(options: RoutesConfigOptions): void
  }
}


const defaultConfig: RoutesConfigOptions = {
  initialRoute: '/'
}

export async function activate(context: Context): Promise<RoutesContext> {
  const store = createStore<ModuleStore>({
    context,
    config: defaultConfig,
    routes: record()
  })
  setStore(store)
  return {
    routes: {
      ...routes,
      config(options: RoutesConfigOptions) {
        store.update(s => { s.config = requiredDeep(s.config, options) })
      }
    },
  }
}

export async function start() {
  routes.navigate(getStore().get().config.initialRoute)
}
