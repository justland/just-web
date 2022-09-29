import type { KeyBindingContribution } from '@just-web/contributions'
import { isMac } from '@just-web/platform'

export const ctx = { isMac }

export function formatKeyBinding(keyBinding: KeyBindingContribution) {
  const m = ctx.isMac()
  return {
    command: keyBinding.command,
    key: m ? keyBinding.mac ?? keyBinding.key : keyBinding.key
  }
}
