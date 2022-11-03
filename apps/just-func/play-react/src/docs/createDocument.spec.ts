import { createDocument } from './createDocument'
import { store } from './store'

beforeEach(async () => {
  store.reset()
})

describe('createDocument()', () => {
  test('creates a file named Untitled-1', () => {
    createDocument()
    const s = store.get()
    const docs = s.docs

    expect(docs.length).toBe(1)
    expect(docs[0].name).toBe('Untitled-1')
  })
  test('create Untitled-2 if there is already Untitled-1', () => {
    createDocument()
    createDocument()
    const s = store.get()
    const docs = s.docs

    expect(docs.length).toBe(2)
    expect(docs[1].name).toBe('Untitled-2')
  })
  test('create Untitled-x on first non-occupied x', () => {
    store.set(s => {
      s.docs.push(
        { name: 'Untitled-1', content: '' },
        { name: 'Untitled-3', content: '' }
      )
    })
    createDocument()
    const s = store.get()
    const d = s.docs[s.docs.length - 1]
    expect(d.name).toBe('Untitled-2')
  })

  test('specify name', () => {
    createDocument('abc')
    const s = store.get()
    const docs = s.docs

    expect(docs.length).toBe(1)
    expect(docs[0].name).toBe('abc')
  })
})
