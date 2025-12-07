import type { History } from 'history'
import { testType } from 'type-plus'
import { it } from 'vitest'
import type { HistoryGizmo } from './index.js'

it('exports HistoryContext', () => {
	testType.equal<HistoryGizmo, { history: History }>(true)
})
