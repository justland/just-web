import type { History } from 'history'
import { isType } from 'type-plus'
import type { HistoryContext } from './index.js'

it('exports HistoryContext', () => {
	isType.equal<true, { history: History }, HistoryContext>()
})
