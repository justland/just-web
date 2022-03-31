import { createStore } from '@just-web/states'
import { record } from 'type-plus'

export const store = createStore(record<string, () => void>())
