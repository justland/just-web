import { a } from 'assertron'
import { create } from 'react-test-renderer'
import { createStoreContext, useStoreContext } from './storeContext'

describe(`${useStoreContext.name}()`, () => {
  it('throws if Context.Provider is not fill in first', () => {
    const Context = createStoreContext()
    const Comp = () => {
      a.throws(
        // eslint-disable-next-line react-hooks/rules-of-hooks
        () => useStoreContext(Context, s => s),
        err => err.message === 'Context.Provider must be used before using useStoreContext()')

      return <></>
    }
    create(<Comp />)
  })
})
