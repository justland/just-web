import { createStore } from '@just-web/states'
import { Doc } from './types'

export const store = createStore<{ docs: Doc[] }>({ docs: [] })
