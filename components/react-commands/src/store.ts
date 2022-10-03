import { CommandsContext } from '@just-web/commands'
import { LogContext } from '@just-web/log'
import { OSContext } from '@just-web/os'
import { Store } from '@just-web/states'

export interface State {
  context: LogContext & CommandsContext & OSContext,
  openCommandPalette: boolean
}

let store: Store<State>

export function setStore(s: Store<State>) {
  return store = s
}

export function getStore() {
  return store
}
