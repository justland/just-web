import { RecursivePartial, requiredDeep } from 'type-plus'
import { errorStore } from './errorStore'
import { registerOnErrorHandler } from './onerror'
import { getStore, setStore, Store } from './optionsStore'

export namespace start {
  export type Options = Store
}

export async function start(options?: RecursivePartial<start.Options>) {
  const optionStore = setStore(requiredDeep(getStore(), options))

  registerOnErrorHandler({
    errors: errorStore.get(),
    setErrors: errorStore.set.bind(errorStore),
    preventDefault: optionStore.browserErrors.preventDefault
  })
}
