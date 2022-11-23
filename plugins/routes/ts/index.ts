import type { LogContext } from '@just-web/log'
import { createStore, Store } from '@just-web/states'
import { definePlugin } from '@just-web/types'
import { record, requiredDeep } from 'type-plus'
import type { Route, RoutesConfigOptions } from './types.js'

export { Route, RoutesConfigOptions }

export type RoutesContext = {
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

export type ModuleStore = {
  config: RoutesConfigOptions,
  routes: Record<string, Route>
} & LogContext

export default definePlugin(() => {
  let store: Store<ModuleStore>
  let routeContext: RoutesContext
  return {
    name: '@just-web/routes',
    init: (ctx: LogContext) => {
      store = createStore<ModuleStore>({
        ...ctx,
        config: defaultConfig,
        routes: record()
      })
      routeContext = {
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

            store.set(s => { s.routes[route] = handler })

            return () => {
              store.set(s => { delete s.routes[route] })
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
            store.set(s => { s.config = requiredDeep(s.config, options) })
          }
        },
      }
      return [routeContext]
    },
    start: async () => {
      routeContext.routes.navigate(store.get().config.initialRoute)
    }
  }
})

function getLogger(store: Store<ModuleStore>) {
  return store.get().log.getLogger('@just-web/routes')
}

/**
 * Check if the specified route is registered or not.
 * This is used mostly for testing purposes
 */
export function hasRoute(store: Store<ModuleStore>, route: string) {
  return !!store.get().routes[route]
}

export function clearRoutes(store: Store<ModuleStore>) {
  store.set(s => { s.routes = record<string, Route>() })
}
