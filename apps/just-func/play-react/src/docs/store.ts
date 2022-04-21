import { createStore } from '@just-web/app'
import { Doc } from './types'

export const store = createStore<{ docs: Doc[] }>({ docs: [] })
