import { CommandsContext } from '@just-web/commands'
import { Logger } from '@just-web/log'
import { Store } from '@just-web/states'

export interface State {
  context: CommandsContext,
  log: Logger,
  openCommandPalette: boolean
}

let store: Store<State>

export function setStore(s: Store<State>) {
  return store = s
}

export function getStore() {
  return store
}
