import { nothing } from 'immer'
import type { AsyncUpdater, Updater } from './types'

describe(`Updater<T>`, () => {
  it('allows returning `nothing` when T includes undefined', () => {
    const foo: Updater<number | undefined> = () => nothing
    foo(1)
  })
})

describe(`AsyncUpdater<T>`, () => {
  it('allows returning `nothing` when T includes undefined', () => {
    const foo: AsyncUpdater<number | undefined> = async () => nothing
    foo(1)
  })
})
