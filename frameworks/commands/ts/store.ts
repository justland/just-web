import { createStore } from '@just-web/states'

export const store = createStore<Record<string, () => void>>(Object.create(null))
