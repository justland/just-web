import type { CommandsContext } from '@just-web/commands'
import { KeyboardContext } from '@just-web/keyboard'
import type { LogContext } from '@just-web/log'
import type { OSContext } from '@just-web/os'
import { definePlugin } from '@just-web/types'
import { startKeyBindings } from './keyBindings.js'

export const browserKeyboardPlugin = definePlugin(() => {
  let context: LogContext & KeyboardContext & CommandsContext & OSContext
  return {
    name: '@just-web/browser-keyboard',
    init(ctx: LogContext & KeyboardContext & CommandsContext & OSContext) {
      context = ctx
    },
    async start() {
      startKeyBindings(context)
    }
  }
})
