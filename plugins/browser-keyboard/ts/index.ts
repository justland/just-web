import type { CommandsContext } from '@just-web/commands'
import { KeyboardContext } from '@just-web/keyboard'
import type { LogContext } from '@just-web/log'
import type { OSContext } from '@just-web/os'
import { definePlugin } from '@just-web/types'
import { startKeyBindings } from './keyBindings'

export default definePlugin(() => ({
  id: '@just-web/browser-keyboard',
  init(ctx: LogContext & KeyboardContext & CommandsContext & OSContext) {
    return [undefined, ctx]
  },
  async start(ctx) {
    startKeyBindings(ctx)
  }
}))
