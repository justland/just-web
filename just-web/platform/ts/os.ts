import platform from 'platform'

export function isMacOS(ctx = { platform }) {
  return ctx.platform.os?.family === 'OS X'
}
