import type { KeyBindingContribution } from '@just-web/contributions'
import { ctx } from './keyBinding.ctx'

export function formatKeyBinding(keyBinding: KeyBindingContribution) {
  const m = ctx.isMac()
  return {
    command: keyBinding.command,
    key: m ? keyBinding.mac ?? keyBinding.key : keyBinding.key
  }
}
