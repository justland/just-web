import { AppBaseContext, definePlugin } from '@just-web/types'

const plugin = definePlugin((options?: { a: number }) => ({
  name: 'dummy',
  init: (_context: AppBaseContext) => [{ dummy: options?.a }]
}))

export default plugin

export const Component = () => <div>dummy</div>
