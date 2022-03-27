import { required } from 'type-plus'
import { log } from './log'

export namespace start {
  export type Ctx = {
    routes: { navigate(route: string): void }
  }
}
const defaultCtx: start.Ctx = {
  routes: {
    navigate(route: string) { log.notice(`navigate: ${route}`) }
  }
}
export function start(options = {}, ctx?: start.Ctx) {
  ctx = required(defaultCtx, ctx)
  log.notice('application starts')
  ctx.routes.navigate('/')
}
