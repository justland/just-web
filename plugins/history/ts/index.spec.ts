import type { History } from 'history'
import { testType } from 'type-plus'
import type { HistoryContext } from './index.js'

it('exports HistoryContext', () => {
	testType.equal<HistoryContext, { history: History }>(true)
})
