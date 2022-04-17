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
  const names = store.get().documents
    .map(d => d.name.match(/^Untitled-(\d+)$/)).filter(Boolean)
    .map(m => +m![1]).sort((a, b) => a - b)
  const firstAvailable = names.findIndex((n, i) => n !== i + 1)
  const i = (firstAvailable !== -1 ? firstAvailable : names.length) + 1
  return `Untitled-${i}`
}
