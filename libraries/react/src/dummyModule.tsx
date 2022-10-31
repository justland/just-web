import { AppBaseContext, definePlugin } from '@just-web/types'

const plugin = definePlugin((options?: { a: number }) => ({
  id: 'dummy',
  init: (_context: AppBaseContext) => [{ dummy: options?.a }]
}))

export default plugin

export const Component = () => <div>dummy</div>
