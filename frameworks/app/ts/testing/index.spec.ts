import { testType } from 'type-plus'
import { type JustTestApp } from './index.js'

it('exports JustTestApp type', () => {
	testType.never<JustTestApp>(false)
})
