import platform from 'platform'

export interface Ctx {
  os?: {
    family?: string
  }
}
export const ctx: Ctx = platform

export function isMac() {
  return ctx.os?.family === 'OS X'
}
