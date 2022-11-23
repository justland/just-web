
import { definePlugin } from '@just-web/types'
import { unpartial } from 'type-plus'
import { isMac } from './os.js'

export * from './os.js'

const osPlugin = definePlugin(() => ({
  name: '@just-web/os',
  // this is added to the context so that tests (e.g. storybook) can simulate the behavior in different platforms
  init: () => [{ os: { isMac } }]
}))

export type OSContext = ReturnType<ReturnType<typeof osPlugin>['init']>[0]
export type OSTestOptions = Partial<OSContext>

export default osPlugin

export const osTestPlugin = definePlugin((options?: OSTestOptions) => ({
  name: '@just-web/os-test',
  init: () => [{ os: unpartial({ isMac }, options?.os) }]
}))
