import { nothing } from 'immer'
import type { JSONTypes } from 'type-plus'
import { describe, expect, it } from 'vitest'
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

	it('allows returning `nothing` when T includes undefined', async () => {
		const fn = (up: Updater<number | undefined>) => up(1)

		await expect(fn(async () => nothing)).resolves.toBe(nothing)
	})
})
