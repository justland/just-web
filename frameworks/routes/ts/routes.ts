import { as } from 'type-plus'
import { log } from './log'

const routes = new Map()

export function navigate(route: string) {
  const r = routes.get(route)
  if (!r) log.error(`navigate target not found: '${route}'`)
  else r()
}

export function registerRoute(route: string, handler: () => void) {
  if (routes.has(route)) {
    log.error(`Registering an already registered route: '${route}'`)
    return () => { }
  }

  routes.set(route, handler)
  return () => as<void>(routes.delete(route))
}

/**
 * Check if the specified route is registered or not.
 * This is used mostly for testing purposes
 */
export function hasRoute(route: string) {
  return routes.has(route)
}
