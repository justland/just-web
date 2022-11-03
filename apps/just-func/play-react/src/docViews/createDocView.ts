import { Doc } from '../docs/types'
import { store } from './store'

export function createDocView(doc: Doc) {
  store.set(s => {
    s.views.push({
      type: 'doc',
      id: doc.name,
      doc
    })
  })
}
