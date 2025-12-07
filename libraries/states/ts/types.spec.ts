import { nothing } from 'immer'
import type { JSONTypes } from 'type-plus'
import type { Updater } from './types.js'

describe('Updater<T>', () => {
	it('allows returning `nothing` when T includes undefined', () => {
		const foo: Updater<number | undefined> = () => nothing
		foo(1)
	})

	it('JSONType', () => {
		const foo: Updater<JSONTypes> = () => {}
		foo(1)
	})

	it('allows returning `nothing` when T includes undefined', () => {
		const foo: Updater<number | undefined> = async () => nothing
		foo(1)
	})
})
