
import { definePlugin } from '@just-web/types'
import { unpartial } from 'type-plus'
import { isMac } from './os'

export * from './os'

const plugin = definePlugin(() => ({
  id: '@just-web/os',
  // this is added to the context so that tests (e.g. storybook) can simulate the behavior in different platforms
  init: () => [{ os: { isMac } }]
}))

export type OSContext = ReturnType<ReturnType<typeof plugin>['init']>[0]
export type OSOptions = Partial<OSContext>

export default plugin

export const osTestPlugin = definePlugin((options?: OSOptions) => ({
  id: '@just-web/os-test',
  init: () => [{ os: unpartial({ isMac }, options?.os) }]
}))
