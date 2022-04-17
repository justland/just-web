import { createTestApp } from '@just-web/app'
import { App, createAppStore, getStore } from '../store'
import { stub } from 'type-plus'
import { createDocument } from './createDocument'

beforeEach(async () => {
  createAppStore(stub<App>(createTestApp()))
})

describe('createDocument()', () => {
  test('creates a file named Untitled-1', () => {
    createDocument()
    const store = getStore()
    const docs = store.get().documents

    expect(docs.length).toBe(1)
    expect(docs[0].name).toBe('Untitled-1')
  })
})
