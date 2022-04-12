import platform from 'platform'

export interface PlatformCtx {
  os?: {
    family?: string
  }
}
export const platformCtx = platform as PlatformCtx

export function isMac() {
  return platformCtx.os?.family === 'OS X'
}
