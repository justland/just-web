import { store } from './store'
import { Doc } from './types'

export function createDocument(name?: string) {
  let doc: Doc
  store.update(s => {
    doc = {
      name: name ?? createDocumentName(s.docs),
      content: ''
    }
    s.docs.push(doc)
  })
  return doc!
}
function createDocumentName(files: Doc[]) {
  const names = files
    .map(d => d.name.match(/^Untitled-(\d+)$/)).filter(Boolean)
    .map(m => +m![1]).sort((a, b) => a - b)
  const firstAvailable = names.findIndex((n, i) => n !== i + 1)
  const i = (firstAvailable !== -1 ? firstAvailable : names.length) + 1
  return `Untitled-${i}`
}

