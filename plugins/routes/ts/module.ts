import { Context, createStore, Store } from '@just-web/app'
import { record, requiredDeep } from 'type-plus'
import type { Route, RoutesConfigOptions } from './types'

export interface RoutesContext {
  routes: {
    navigate(route: string): void,
    register(route: string, handler: () => void): Route,
    hasRoute(route: string): boolean,
    clearRoutes(): void,
    validateRoutes(): Promise<boolean>,
    config(options: RoutesConfigOptions): void
  }
}

const defaultConfig: RoutesConfigOptions = {
  initialRoute: '/'
}

interface ModuleStore {
  context: Context,
  config: RoutesConfigOptions,
  routes: Record<string, Route>
}

export async function activate(context: Context) {
  const store = createStore<ModuleStore>({
    context,
    config: defaultConfig,
    routes: record()
  })
  const routeContext: RoutesContext = {
    routes: {
      navigate(route) {
        const log = getLogger(store)
        const r = store.get().routes[route]
        if (!r) log.error(`navigate target not found: '${route}'`)
        else {
          log.notice(`navigate to: '${route}'`)
          r()
        }
      },
      register(route, handler) {
        if (hasRoute(store, route)) {
          const log = getLogger(store)
          log.error(`Registering an already registered route: '${route}'`)
          return () => { }
        }

        store.update(s => { s.routes[route] = handler })

        return () => {
          store.update(s => { delete s.routes[route] })
        }
      },
      hasRoute(route) { return hasRoute(store, route) },
      clearRoutes() { clearRoutes(store) },
      async validateRoutes() {
        let ready = true
        if (!hasRoute(store, '/')) {
          const log = getLogger(store)
          log.error(`route '/' is required`)
          ready = false
        }
        if (!hasRoute(store, '/error')) {
          const log = getLogger(store)
          log.error(`route '/error' is required`)
          ready = false
        }

        return ready
      },
      config(options: RoutesConfigOptions) {
        store.update(s => { s.config = requiredDeep(s.config, options) })
      }
    },
  }
  return [routeContext, { store, routeContext }] as [RoutesContext, { store: Store<ModuleStore>, routeContext: RoutesContext }]
}

export async function start(
  { store, routeContext }: { store: Store<ModuleStore>, routeContext: RoutesContext }
) {
  routeContext.routes.navigate(store.get().config.initialRoute)
}

function getLogger(store: Store<ModuleStore>) {
  return store.get().context.log.getLogger('@just-web/routes')
}

/**
 * Check if the specified route is registered or not.
 * This is used mostly for testing purposes
 */
export function hasRoute(store: Store<ModuleStore>, route: string) {
  return !!store.get().routes[route]
}

export function clearRoutes(store: Store<ModuleStore>) {
  store.update(s => { s.routes = record() })
}
