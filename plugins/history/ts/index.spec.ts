import type { History } from 'history'
import { testType } from 'type-plus'
import type { HistoryGizmo } from './index.js'

it('exports HistoryContext', () => {
	testType.equal<HistoryGizmo, { history: History }>(true)
})
