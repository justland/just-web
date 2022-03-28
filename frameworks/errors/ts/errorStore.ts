import { createStore } from '@just-web/states'
import { ModuleError } from 'iso-error'

export const errorStore = createStore<ModuleError[]>([])
