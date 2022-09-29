import { ctx } from './os.ctx'

export function isMac() {
  return ctx.os?.family === 'OS X'
}
