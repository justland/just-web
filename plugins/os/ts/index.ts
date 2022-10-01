import { definePlugin } from '@just-web/types'
import { isMac } from './os'
import type { OSContext } from './types'

export * from './os'
export { OSContext }

export default definePlugin({
  init: async (): Promise<[OSContext]> => {
    return [{
      os: { isMac },
    }]
  }
})

export function createOSContext() {
  return {
    os: { isMac }
  }
}
