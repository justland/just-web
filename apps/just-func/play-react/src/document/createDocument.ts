import { getStore } from '../store'

export function createDocument(name?: string) {
  const store = getStore()
  store.update(s => {
    s.documents.push({
      name: name ?? createDocumentName(),
      content: ''
    })
  })
}

function createDocumentName() {
  const store = getStore()
  const names = store.get().documents.filter(d => d.name.match(/^Untitled-\d+$/))
  return `Untitled-${names.length + 1}`
}
