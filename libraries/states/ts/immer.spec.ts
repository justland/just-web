import { isType } from 'type-plus'
import { isNothing, nothing } from './index'

describe(`${isNothing}()`, () => {
  it('guard undefined as not `nothing`', () => {
    const und: string | typeof nothing | undefined = undefined as any

    if (isNothing(und)) {
      isType.equal<true, typeof nothing, typeof und>()
      fail('should not reach')
    }
    else {
      isType.equal<true, string | undefined, typeof und>()
    }
  })

  it('guard `nothing` as `nothing`', () => {
    const und: string | typeof nothing | undefined = nothing as any

    if (isNothing(und)) {
      isType.equal<true, typeof nothing, typeof und>()
    }
    else {
      isType.equal<true, string | undefined, typeof und>()
      fail('should not reach')
    }
  })
})
