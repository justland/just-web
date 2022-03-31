import { createStore } from '@just-web/states'
import produce from 'immer'
import { record } from 'type-plus'
import { log } from './log'

export interface Route {
  (): void
}

export const routes = createStore<Record<string, Route>>(record())

export function navigate(route: string) {
  const r = routes.get()[route]
  if (!r) log.error(`navigate target not found: '${route}'`)
  else r()
}

export function registerRoute(route: string, handler: () => void) {
  if (hasRoute(route)) {
    log.error(`Registering an already registered route: '${route}'`)
    return () => { }
  }

  routes.set(produce(routes.get(), r => { r[route] = handler }))
  return () => {
    routes.set(produce(routes.get(), r => { delete r[route] }))
  }
}
/**
 * Check if the specified route is registered or not.
 * This is used mostly for testing purposes
 */
export function hasRoute(route: string) {
  return !!routes.get()[route]
}

export function clearRoutes() {
  routes.set(record())
}

export async function validateRoutes() {
  let ready = true
  if (!hasRoute('/')) {
    log.error(`route '/' is required`)
    ready = false
  }
  if (!hasRoute('/error')) {
    log.error(`route '/error' is required`)
    ready = false
  }

  return ready
}
