import { createStandardLogForTest, logLevels } from '@just-web/log'
import { nothing } from 'immer'
import { isType } from 'type-plus'
import { createState, OnStateChange } from './state.js'

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
		isType.equal<true, number, typeof actual>()
		expect(actual).toEqual(2)
		expect(t.get()).toEqual(2)
	})

	it(`accepts undefined, which set value to undefined`, () => {
		// can't test to make sure this is not possible if the type does not contain undefined,
		// due to: https://github.com/microsoft/TypeScript/issues/29732
		const [, set, on] = createState<number | undefined>(1)
		const t = trap(on)
		const actual = set(undefined)
		isType.equal<true, number | undefined, typeof actual>()
		expect(actual).toEqual(undefined)
		expect(t.get()).toEqual(undefined)
	})

	it(`accepts an updater that returns the new value`, () => {
		const [, set, on] = createState(1)
		const t = trap(on)
		const actual = set(() => 2)
		isType.equal<true, number, typeof actual>()
		expect(actual).toEqual(2)
		expect(t.get()).toEqual(2)
	})

	it('accepts an updater that modify value in-place', () => {
		const [, set, on] = createState({ a: 1 })
		const t = trap(on)
		const actual = set(v => {
			v.a = 2
		})
		isType.equal<true, { a: number }, typeof actual>()
		expect(actual).toEqual({ a: 2 })
		expect(t.get()).toEqual({ a: 2 })
	})

	it('accepts an updater that returns nothing, which set the value to undefined', () => {
		const [, set, on] = createState<{ a: number } | undefined>({ a: 1 })
		const t = trap(on)
		const actual = set(() => nothing)
		isType.equal<true, { a: number } | undefined, typeof actual>()
		expect(actual).toEqual(undefined)
		expect(t.get()).toEqual(undefined)
	})

	it(`accepts an async updater that returns the new value`, async () => {
		const [, set, on] = createState(1)
		const t = trap(on)
		const r = set(async () => 2)
		isType.equal<true, Promise<number>, typeof r>()
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
		isType.equal<true, Promise<{ a: number }>, typeof r>()
		const actual = await r
		expect(actual).toEqual({ a: 2 })
		expect(t.get()).toEqual({ a: 2 })
	})

	it('accepts an async updater that returns nothing, which set the value to undefined', async () => {
		const [, set, on] = createState<{ a: number } | undefined>({ a: 1 })
		const t = trap(on)
		const r = set(async () => nothing)
		isType.equal<true, Promise<{ a: number } | undefined>, typeof r>()
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

	it('can use a custom logger', () => {
		const sl = createStandardLogForTest({ logLevel: logLevels.all })
		const [, set] = createState([1])
		set([2], { logger: sl.getLogger('test') })

		expect(sl.reporter.getLogMessagesWithIdAndLevel()).toEqual(['test (PLANCK) state changed: [ 1 ] [ 2 ]'])
	})
})

describe(`reset()`, () => {
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

	it('can use a custom logger', () => {
		const sl = createStandardLogForTest({ logLevel: logLevels.all })
		const [, , onChange] = createState([1])

		let count = 0
		const handler = () => count++
		onChange(handler, { logger: sl.getLogger('test') })

		expect(sl.reporter.getLogMessagesWithIdAndLevel()).toEqual([
			'test (TRACE) new onChange handler: () => count++'
		])
	})

	it('skip if the same handler is already registered', () => {
		const sl = createStandardLogForTest({ logLevel: logLevels.all })
		const [, , onChange] = createState([1])

		let count = 0
		const handler = () => count++
		onChange(handler, { logger: sl.getLogger('test') })
		onChange(handler, { logger: sl.getLogger('test') })

		// show that setting only occurs once
		expect(sl.reporter.getLogMessagesWithIdAndLevel()).toEqual([
			'test (TRACE) new onChange handler: () => count++'
		])
	})

	it('returns a dispose function', () => {
		const sl = createStandardLogForTest({ logLevel: logLevels.all })
		const logger = sl.getLogger('test')

		const [, , onChange] = createState([1])

		let count = 0
		const handler = () => count++
		const dispose = onChange(handler, { logger })
		dispose()

		onChange(handler, { logger })

		expect(sl.reporter.getLogMessagesWithIdAndLevel()).toEqual([
			'test (TRACE) new onChange handler: () => count++',
			'test (TRACE) new onChange handler: () => count++'
		])
	})

	it(`the dup handler's dispose function does nothing`, () => {
		const sl = createStandardLogForTest({ logLevel: logLevels.all })
		const logger = sl.getLogger('test')

		const [, set, onChange] = createState([1])

		let count = 0
		const handler = () => count++
		onChange(handler, { logger })
		const dispose = onChange(handler, { logger })
		dispose()

		set([2])

		expect(count).toBe(1)
	})

	it.todo('handler throws will not affect set call')
})

describe('function as value', () => {
	const initFn = (x: number) => x + 1
	const init = Object.assign(initFn, { b: 1 })
	it(`gets the init function as value`, () => {
		const [v] = createState(initFn)

		expect(v).toStrictEqual(initFn)
	})

	it(`gets the function object as value`, () => {
		const [v] = createState(init)

		expect(v).toStrictEqual(init)
	})

	describe('set()', () => {
		it(`set new funcion`, () => {
			const [, set] = createState(initFn)
			const actual = set((a: number) => a - 1)
			expect(actual!(2)).toEqual(1)
		})

		it(`set new funcion object`, () => {
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
