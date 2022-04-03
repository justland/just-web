import platform from 'platform'

export namespace isMacOS {
  export interface Ctx {
    platform: {
      os?: {
        family?: string
      }
    }
  }
}

export function isMacOS(ctx: isMacOS.Ctx = { platform }) {
  return ctx.platform.os?.family === 'OS X'
}
