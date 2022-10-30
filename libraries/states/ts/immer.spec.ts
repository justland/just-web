import { isType } from 'type-plus'
import { isNothing, nothing } from '.'

describe(`${isNothing}()`, () => {
  it('works as a type guard', () => {
    let x: string | typeof nothing | undefined

    if (isNothing(x)) isType.equal<true, typeof nothing, typeof x>()
    else isType.equal<true, string | undefined, typeof x>()
  })
})
