import { createState } from '@just-web/states'
import type { ModuleError } from 'iso-error'
import { RecursivePartial, requiredDeep } from 'type-plus'
import { errorStore } from './errorStore'
import { registerOnErrorHandler } from './onerror'
import { getStore, setStore, Store } from './optionsStore'

export namespace start {
  export type Options = Store
}

export async function start(options?: RecursivePartial<start.Options>) {
  const [errors, setErrors, onChange] = createState<ModuleError[]>(errorStore.get())

  errorStore.activate(errors, setErrors, onChange)

  const optionStore = setStore(requiredDeep(getStore(), options))

  registerOnErrorHandler({
    errors,
    setErrors,
    preventDefault: optionStore.browserErrors.preventDefault
  })
}
