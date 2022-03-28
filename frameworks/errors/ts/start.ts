import { createState } from '@just-web/states'
import type { ModuleError } from 'iso-error'
import { RecursivePartial, requiredDeep } from 'type-plus'
import { registerOnErrorHandler } from './onerror'
import { getStore, setStore, Store } from './store'

export namespace start {
  export type Options = Store
}

export async function start(options?: RecursivePartial<start.Options>) {
  const [errors, setErrors] = createState<ModuleError[]>([])

  const store = setStore(requiredDeep(getStore(), options))
  registerOnErrorHandler({
    errors,
    setErrors,
    preventDefault: store.browserErrors.preventDefault
  })
}
