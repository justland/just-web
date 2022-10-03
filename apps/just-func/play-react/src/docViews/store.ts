import { createStore } from '@just-web/states'
import { View } from './types'

export const store = createStore<{ views: View[] }>({ views: [] })
