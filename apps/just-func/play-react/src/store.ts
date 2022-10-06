import { JustWebApp } from '@just-web/app'
import { BrowserContext } from '@just-web/browser'
import { CommandsContext } from '@just-web/commands'
import { KeyboardContext } from '@just-web/keyboard'
import { OSContext } from '@just-web/os'
import { RoutesContext } from '@just-web/routes'
import { createStore, Store } from '@just-web/states'

export type App = JustWebApp & KeyboardContext & OSContext & BrowserContext & CommandsContext & RoutesContext

export interface AppStore<A = App> {
  app: A
}

let s: Store<AppStore<any>>

export function createAppStore<A extends App = App>(app: A) {
  return s = createStore<AppStore<A>>({ app })
}

export function getStore<A extends App = App>() {
  return s as Store<AppStore<A>>
}

export function getStoreValue<A extends App = App>() {
  return s.get() as AppStore<A>
}
