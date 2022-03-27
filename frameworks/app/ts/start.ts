import { navigate, registerRoute } from '@just-web/routes'
import { required } from 'type-plus'
import { log } from './log'

const defaultCtx = {
  routes: { navigate, registerRoute }
}
export namespace start {
  export type Ctx = typeof defaultCtx
}

export function start(options = {}, ctx?: start.Ctx) {
  const { routes } = required(defaultCtx, ctx)
  log.notice('application starts')

  // TODO: validate app to make sure it has the minimum implementation,
  // such as handling `/` and `/error`
  routes.navigate('/')
}
