import { ReadonlyContext } from '@just-web/contexts'
import { setContext } from './context'

export function activate(context: ReadonlyContext) {
  setContext(context)
}
