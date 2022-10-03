import { LogContext } from '@just-web/log'
import { definePlugin } from '@just-web/types'

export default definePlugin(() => ({
  name: 'dummy',
  init(_context: LogContext) { }
}))

export const Component = () => <div>dummy</div>
