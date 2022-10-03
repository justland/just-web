import { JustWebApp, createStore, Store } from '@just-web/app'
import { BrowserContext } from '@just-web/browser'
import { CommandsContext } from '@just-web/commands'
import { ContributionsContext } from '@just-web/contributions'
import { OSContext } from '@just-web/os'
import { RoutesContext } from '@just-web/routes'

export type App = JustWebApp & ContributionsContext & OSContext & BrowserContext & CommandsContext & RoutesContext

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
