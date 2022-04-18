import { KeyBindingContribution } from '@just-web/contributions'
import { isMac } from '@just-web/platform'

export function formatKeyBinding(keyBinding: KeyBindingContribution) {
  const m = formatKeyBinding.ctx.isMac()
  return {
    command: keyBinding.command,
    key: m ? keyBinding.mac ?? keyBinding.key : keyBinding.key
  }
}

formatKeyBinding.ctx = { isMac }
