import { define, type LogGizmo } from '@just-web/app'
import { createStore, type Store } from '@just-web/states'
import { record, requiredDeep } from 'type-plus'
import type { Route, RoutesConfigOptions } from './types.js'

const defaultConfig: RoutesConfigOptions = {
	initialRoute: '/'
}

type RouteStore = {
	config: RoutesConfigOptions
	routes: Record<string, Route>
}

export const routesGizmo = define({
	static: define.require<LogGizmo>(),
	async create(ctx) {
		const store = createStore<RouteStore>({
			config: defaultConfig,
			routes: record()
		})
		const log = ctx.log.getLogger('@just-web/routes')
		const routes = {
			navigate(route?: string) {
				route = route ?? store.get().config.initialRoute
				const r = store.get().routes[route]
				if (!r) log.error(`navigate target not found: '${route}'`)
				else {
					log.notice(`navigate to: '${route}'`)
					r()
				}
			},
			register(route: string, handler: Route) {
				if (hasRoute(store, route)) {
					log.error(`Registering an already registered route: '${route}'`)
					return () => {}
				}

				store.set(s => {
					s.routes[route] = handler
				})

				return () => {
					store.set(s => {
						delete s.routes[route]
					})
				}
			},
			hasRoute(route: string) {
				return hasRoute(store, route)
			},
			clearRoutes() {
				clearRoutes(store)
			},
			config(options: RoutesConfigOptions) {
				store.set(s => {
					s.config = requiredDeep(s.config, options)
				})
			}
		}
		return { routes }
	}
})

export type RoutesGizmo = define.Infer<typeof routesGizmo>

/**
 * Check if the specified route is registered or not.
 * This is used mostly for testing purposes
 */
function hasRoute(store: Store<RouteStore>, route: string) {
	return !!store.get().routes[route]
}

function clearRoutes(store: Store<RouteStore>) {
	store.set(s => {
		s.routes = record<string, Route>()
	})
}
