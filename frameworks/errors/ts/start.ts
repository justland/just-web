import { RecursivePartial, requiredDeep } from 'type-plus'
import { registerOnErrorHandler } from './onerror'
import { getStore, setStore, Store } from './store'

export namespace start {
  export type Options = Store
}

export async function start(options?: RecursivePartial<start.Options>) {
  const store = setStore(requiredDeep(getStore(), options))
  registerOnErrorHandler(store.browserErrors.preventDefault)
}
