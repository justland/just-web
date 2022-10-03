import { range } from 'ramda'
import { record } from 'type-plus'
import { createApp } from './createApp'

describe(createApp.name, () => {
  it('randomize the app id', () => {
    const x = range(0, 100)
      .map(() => createApp({ name: 'random' }).id)
      .reduce((p, v) => (p[v] = true, p), record())

    expect(Object.keys(x).length).toBe(100)
  })
})
