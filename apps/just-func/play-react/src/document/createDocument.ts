import { File, getStore } from '../store'

export function createDocument(name?: string) {
  const store = getStore()
  store.update(s => {
    const file = {
      name: name ?? createDocumentName(s.files),
      content: ''
    }
    s.files.push(file)
    s.openedFilenames.push(file.name)
  })
}

function createDocumentName(files: File[]) {
  const names = files
    .map(d => d.name.match(/^Untitled-(\d+)$/)).filter(Boolean)
    .map(m => +m![1]).sort((a, b) => a - b)
  const firstAvailable = names.findIndex((n, i) => n !== i + 1)
  const i = (firstAvailable !== -1 ? firstAvailable : names.length) + 1
  return `Untitled-${i}`
}
