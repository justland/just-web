import platform from 'platform'

export namespace ctx {
  export type OperatingSystem = {
    family?: string
  }
}

export const ctx: { os?: ctx.OperatingSystem } = platform
