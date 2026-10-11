import { testType } from 'type-plus/testing'
import { it } from 'vitest'
import type { JustTestApp } from './index.js'

it('exports JustTestApp type', () => {
	testType.never<JustTestApp>(false)
})
