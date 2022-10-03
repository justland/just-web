import { LogContext } from '@just-web/log'
import { definePlugin } from '@just-web/types'
import { unpartial } from 'type-plus'
import { isMac } from './os'

export * from './os'

const plugin = definePlugin(() => ({
  name: '@just-web/os',
  init: (ctx: LogContext) => {
    ctx.log.notice('init')
    // this is added to the context so that tests (e.g. storybook) can simulate the behavior in different platforms
    return [{ os: { isMac } }]
  }
}))

export type OSContext = ReturnType<ReturnType<typeof plugin>['init']>[0]
export type OSOptions = Partial<OSContext>

export default plugin

export const osTestPlugin = definePlugin((options?: OSOptions) => ({
  name: '@just-web/os-test',
  init: ({ log }: LogContext) => {
    log.notice('init')
    return [{
      os: unpartial({ isMac }, options?.os)
    }]
  }
}))
