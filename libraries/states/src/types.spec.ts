import { nothing } from 'immer'
import type { JsonPrimitive } from 'type-plus'
import { describe, expect, it } from 'vitest'
import type { Updater } from './types.js'

describe('Updater<T>', () => {
	it('allows returning `nothing` when T includes undefined', () => {
		const foo: Updater<number | undefined> = () => nothing
		foo(1)
	})

	it('JSON values', () => {
		// type-plus 8 `JsonTypes` uses readonly arrays,
		// which makes immer's `Draft<T>` recurse past the instantiation depth limit.
		type Json = JsonPrimitive | Json[] | { [key: string]: Json }
		const foo: Updater<Json> = () => {}
		foo(1)
	})

	it('allows returning `nothing` when T includes undefined', async () => {
		const fn = (up: Updater<number | undefined>) => up(1)

		await expect(fn(async () => nothing)).resolves.toBe(nothing)
	})
})
