import { definePlugin } from '@just-web/types'
import { isMac } from './os'
import type { OSContext } from './types'

export * from './os'
export { OSContext }

export default definePlugin(() => ({
  name: '@just-web/os',
  init: (): [OSContext] => [{ os: { isMac } }]
}))
