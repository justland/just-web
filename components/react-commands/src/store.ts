import { CommandsContext } from '@just-web/commands'
import { ContributionsContext } from '@just-web/contributions'
import { LogContext } from '@just-web/log'
import { OSContext } from '@just-web/os'
import { Store } from '@just-web/states'

export interface State {
  context: LogContext & ContributionsContext & CommandsContext & OSContext,
  openCommandPalette: boolean
}

let store: Store<State>

export function setStore(s: Store<State>) {
  return store = s
}

export function getStore() {
  return store
}
