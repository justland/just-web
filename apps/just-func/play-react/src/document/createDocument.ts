import { getStore } from '../store'

export function createDocument() {
  const store = getStore()
  store.update(s => {
    s.documents.push({
      name: createDocumentName(),
      content: ''
    })
  })
}

function createDocumentName() {
  const store = getStore()
  const names = store.get().documents.filter(d => d.name.match(/^Untitled-\d+$/))
  return `Untitled-${names.length + 1}`
}
