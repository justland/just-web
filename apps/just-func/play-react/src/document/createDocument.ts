import { Doc, DocView, getStore } from '../store'

export function createDocument(name?: string) {
  const store = getStore()
  store.update(s => {
    const doc = {
      name: name ?? createDocumentName(s.docs),
      content: ''
    }
    s.docs.push(doc)
    s.openedViews.push(createDocView(doc))
  })
}

function createDocView(doc: Doc): DocView {
  return {
    type: 'doc',
    id: doc.name,
    doc
  }
}
function createDocumentName(files: Doc[]) {
  const names = files
    .map(d => d.name.match(/^Untitled-(\d+)$/)).filter(Boolean)
    .map(m => +m![1]).sort((a, b) => a - b)
  const firstAvailable = names.findIndex((n, i) => n !== i + 1)
  const i = (firstAvailable !== -1 ? firstAvailable : names.length) + 1
  return `Untitled-${i}`
}
