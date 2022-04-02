import { createErrorStore, toReadonlyErrorStore } from './errorStore'

describe('toReadonly()', () => {
  test('readonly error store can still add', () => {
    const store = createErrorStore()
    const subject = toReadonlyErrorStore(store)

    const err = new Error('something')
    subject.add(err)

    expect(store.get()).toEqual([err])
  })
})
