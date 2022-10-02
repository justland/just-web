import { range } from 'ramda'
import { record } from 'type-plus'
import { createApp2 } from './createApp2'

describe(createApp2.name, () => {
  it('randomize the app id', () => {
    const x = range(0, 100)
      .map(() => createApp2({ name: 'random' }).id)
      .reduce((p, v) => (p[v] = true, p), record())

    expect(Object.keys(x).length).toBe(100)
  })
})
