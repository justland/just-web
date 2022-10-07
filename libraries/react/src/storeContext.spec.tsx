import { a } from 'assertron'
import { createStoreContext, useStoreContext } from './storeContext'

describe(`${useStoreContext.name}()`, () => {
  it('throws if Context.Provider is not fill in first', () => {
    const Context = createStoreContext()
    a.throws(() => useStoreContext(Context, s => s))
  })
})
