import { testType } from 'type-plus'
import type { JustApp, JustAppOptions } from './index.js'

it('expose JustAppOptions and JustApp', () => {
	testType.never<JustAppOptions>(false)
	testType.never<JustApp>(false)
})
