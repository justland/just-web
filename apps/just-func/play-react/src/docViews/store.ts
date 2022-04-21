import { createStore } from '@just-web/app'
import { View } from './types'

export const store = createStore<{ views: View[] }>({ views: [] })
