import { testType } from 'type-plus'
import { isNothing, nothing } from './index.js'

describe(`${isNothing}()`, () => {
	it('guard undefined as not `nothing`', () => {
		const und: string | typeof nothing | undefined = undefined as any

		if (isNothing(und)) {
			testType.equal<typeof und, typeof nothing>(true)
			fail('should not reach')
		} else {
			testType.equal<typeof und, string | undefined>(true)
		}
	})

	it('guard `nothing` as `nothing`', () => {
		const und: string | typeof nothing | undefined = nothing as any

		if (isNothing(und)) {
			testType.equal<typeof und, typeof nothing>(true)
		} else {
			testType.equal<typeof und, string | undefined>(true)
			fail('should not reach')
		}
	})
})
