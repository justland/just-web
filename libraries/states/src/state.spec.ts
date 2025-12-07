import { logLevels } from '@just-web/app'
import { justTestApp } from '@just-web/app/testing'
import { a, has, some } from 'assertron'
import { nothing } from 'immer'
import { testType } from 'type-plus'
import { describe, expect, it } from 'vitest'
import { createState, type OnStateChange } from './state.js'

it('returns initial value', () => {
	const [value] = createState([1, 2, 3])

	expect(value).toEqual([1, 2, 3])
})

it('freezes the init value', () => {
	const init = [1, 2, 3]
	createState(init)
	expect(() => (init[3] = 4)).toThrow()
})

it('freezes the return value', () => {
	const [value] = createState([1, 2, 3])
	expect(() => (value[3] = 4)).toThrow()
})

function trap<T>(on: OnStateChange<T>) {
	let actual: T
	on(v => (actual = v))
	return {
		get() {
			return actual
		}
	}
}

describe('set()', () => {
	it('can set value directly', () => {
		const [, set, on] = createState(1)
		const t = trap(on)
		const actual = set(2)
		testType.equal<typeof actual, number>(true)
		expect(actual).toEqual(2)
		expect(t.get()).toEqual(2)
	})

	it('accepts undefined, which set value to undefined', () => {
		// can't test to make sure this is not possible if the type does not contain undefined,
		// due to: https://github.com/microsoft/TypeScript/issues/29732
		const [, set, on] = createState<number | undefined>(1)
		const t = trap(on)
		const actual = set(undefined)
		testType.equal<typeof actual, number | undefined>(true)
		expect(actual).toEqual(undefined)
		expect(t.get()).toEqual(undefined)
	})

	it('accepts an updater that returns the new value', () => {
		const [, set, on] = createState(1)
		const t = trap(on)
		const actual = set(() => 2)
		testType.equal<typeof actual, number>(true)
		expect(actual).toEqual(2)
		expect(t.get()).toEqual(2)
	})

	it('accepts an updater that modify value in-place', () => {
		const [, set, on] = createState({ a: 1 })
		const t = trap(on)
		const actual = set(v => {
			v.a = 2
		})
		testType.equal<typeof actual, { a: number }>(true)
		expect(actual).toEqual({ a: 2 })
		expect(t.get()).toEqual({ a: 2 })
	})

	it('accepts an updater that returns nothing, which set the value to undefined', () => {
		const [, set, on] = createState<{ a: number } | undefined>({ a: 1 })
		const t = trap(on)
		const actual = set(() => nothing)
		testType.equal<typeof actual, { a: number } | undefined>(true)
		expect(actual).toEqual(undefined)
		expect(t.get()).toEqual(undefined)
	})

	it('accepts an async updater that returns the new value', async () => {
		const [, set, on] = createState(1)
		const t = trap(on)
		const r = set(async () => 2)
		testType.equal<typeof r, Promise<number>>(true)
		const actual = await r
		expect(actual).toEqual(2)
		expect(t.get()).toEqual(2)
	})

	it('accepts an async updater that modify value in-place', async () => {
		const [, set, on] = createState({ a: 1 })
		const t = trap(on)
		const r = set(async v => {
			v.a = 2
		})
		testType.equal<typeof r, Promise<{ a: number }>>(true)
		const actual = await r
		expect(actual).toEqual({ a: 2 })
		expect(t.get()).toEqual({ a: 2 })
	})

	it('accepts an async updater that returns nothing, which set the value to undefined', async () => {
		const [, set, on] = createState<{ a: number } | undefined>({ a: 1 })
		const t = trap(on)
		const r = set(async () => nothing)
		testType.equal<typeof r, Promise<{ a: number } | undefined>>(true)
		const actual = await r
		expect(actual).toEqual(undefined)
		expect(t.get()).toEqual(undefined)
	})

	it('triggers onChange with new and prev value', () => {
		const [, set, onChange] = createState([1, 2, 3])

		let newValue: number[]
		let oldValue: number[]
		onChange((value, prev) => ((newValue = value), (oldValue = prev)))
		set([1, 2, 4])

		expect(newValue!).toEqual([1, 2, 4])
		expect(oldValue!).toEqual([1, 2, 3])
	})

	it('will not trigger onChange if the value does not change', () => {
		const [value, set, onChange] = createState([1, 2, 3])

		onChange(() => {
			throw 'should not trigger'
		})
		set(value)
	})

	it('can use a custom logger', async () => {
		const { log } = await justTestApp({ log: { logLevel: logLevels.all } }).create()
		const [, set] = createState([1], { logger: log.getLogger() })
		set([2])

		a.satisfies(log.reporter.getLogMessagesWithIdAndLevel(), some('test (PLANCK) state changed: [ 1 ] [ 2 ]'))
	})
})

describe('reset()', () => {
	it('resets to the original value', () => {
		const [, set, on, reset] = createState(1)

		let a: number
		on(v => (a = v))
		set(3)
		reset()
		expect(a!).toBe(1)
	})
})

describe('onChange()', () => {
	it('registers handler only once', () => {
		const [, set, onChange] = createState(1)
		let count = 0
		const handler = () => count++
		onChange(handler)
		onChange(handler)
		set(2)

		expect(count).toBe(1)
	})

	it('can use a custom logger', async () => {
		const { log } = await justTestApp({ log: { logLevel: logLevels.all } }).create()
		const [, , onChange] = createState([1], { logger: log.getLogger() })

		let count = 0
		const handler = () => count++
		onChange(handler)

		a.satisfies(log.reporter.getLogMessagesWithIdAndLevel(), some('test (TRACE) new onChange handler: () => count++'))
	})

	it('skip if the same handler is already registered', async () => {
		const { log } = await justTestApp({ log: { logLevel: logLevels.all } }).create()
		const [, , onChange] = createState([1], { logger: log.getLogger() })

		let count = 0
		const handler = () => count++
		onChange(handler)
		onChange(handler)

		// show that setting only occurs once
		a.satisfies(log.reporter.getLogMessagesWithIdAndLevel(), some('test (TRACE) new onChange handler: () => count++'))
	})

	it('returns a dispose function', async () => {
		const { log } = await justTestApp({ log: { logLevel: logLevels.all } }).create()
		const logger = log.getLogger()

		const [, , onChange] = createState([1], { logger })

		let count = 0
		const handler = () => count++
		const dispose = onChange(handler)
		dispose()

		onChange(handler)

		a.satisfies(
			log.reporter.getLogMessagesWithIdAndLevel(),
			has('test (TRACE) new onChange handler: () => count++', 'test (TRACE) new onChange handler: () => count++')
		)
	})

	it(`the dup handler's dispose function does nothing`, async () => {
		const { log } = await justTestApp({ log: { logLevel: logLevels.all } }).create()
		const logger = log.getLogger('test')

		const [, set, onChange] = createState([1], { logger })

		let count = 0
		const handler = () => count++
		onChange(handler)
		const dispose = onChange(handler)
		dispose()

		set([2])

		expect(count).toBe(1)
	})

	it.todo('handler throws will not affect set call')
})

describe('function as value', () => {
	const initFn = (x: number) => x + 1
	const init = Object.assign(initFn, { b: 1 })
	it('gets the init function as value', () => {
		const [v] = createState(initFn)

		expect(v).toStrictEqual(initFn)
	})

	it('gets the function object as value', () => {
		const [v] = createState(init)

		expect(v).toStrictEqual(init)
	})

	describe('set()', () => {
		it('set new funcion', () => {
			const [, set] = createState(initFn)
			const actual = set((a: number) => a - 1)
			expect(actual!(2)).toEqual(1)
		})

		it('set new funcion object', () => {
			const [, set] = createState(init)
			const actual = set(Object.assign((a: number) => a - 1, { b: 2 }))
			expect(actual!(2)).toEqual(1)
		})

		it('accepts undefined, setting value to undefined', () => {
			const [, set] = createState<typeof init | undefined>(init)
			const actual = set(undefined)
			expect(actual).toEqual(undefined)
		})
	})
})
