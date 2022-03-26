import platform from 'platform'

export type Platform = typeof platform

export function isMacOS(ctx: { platform: Platform } = { platform }) {
  return ctx.platform.os?.family === 'OS X'
}
