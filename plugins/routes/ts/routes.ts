import { record } from 'type-plus'
import { log } from './log'
import { getStore } from './store'

export function navigate(route: string) {
  const r = getStore().get().routes[route]
  if (!r) log.error(`navigate target not found: '${route}'`)
  else {
    log.notice(`navigate to: '${route}'`)
    r()
  }
}

export function register(route: string, handler: () => void) {
  if (hasRoute(route)) {
    log.error(`Registering an already registered route: '${route}'`)
    return () => { }
  }

  const store = getStore()
  store.update(s => { s.routes[route] = handler })

  return () => {
    store.update(s => { delete s.routes[route] })
  }
}
/**
 * Check if the specified route is registered or not.
 * This is used mostly for testing purposes
 */
export function hasRoute(route: string) {
  return !!getStore().get().routes[route]
}

export function clearRoutes() {
  getStore().update(s => { s.routes = record() })
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
