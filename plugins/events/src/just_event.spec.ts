/**
 * For more information on how to use `justEvent`,
 *
 * @see https://github.com/unional/events-plus
 */
import { expect, it } from 'vitest'

import { justEvent } from './index.js'

it('creates just event with empty payload', () => {
	const occurredEvent = justEvent('occurred')
	expect(occurredEvent()).toEqual([undefined, undefined])
})

it('creates just event with payload', () => {
	const plusOne = justEvent<number>('plus-one')
	expect(plusOne(1)).toEqual([1, undefined])
})

it('creates just event with tuple payload', () => {
	const addEvent = justEvent<[a: number, b: number]>('add')
	expect(addEvent([1, 2])).toEqual([[1, 2], undefined])
})

it('creates just event with tuple payload and context', () => {
	const addEvent = justEvent<[a: number, b: number], { logs: string[] }>('add')
	expect(addEvent([1, 2], { logs: [] })).toEqual([[1, 2], { logs: [] }])
})
