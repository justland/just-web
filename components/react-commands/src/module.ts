import { Context } from '@just-web/contexts'
import { setContext } from './context'

/**
 * right now this module does not need to be a plugin.
 * Doing this just as an plugin example
 */
export function activate(context: Context) {
  setContext(context)
  context.commands.registry.register('just-web.showCommandPalette', () => {
    alert('showCommand invoked')
  })
}
