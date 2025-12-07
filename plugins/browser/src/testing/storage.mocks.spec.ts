import { testType } from 'type-plus'
import { describe, expect, it } from 'vitest'
import { stubLocalStorage, stubSessionStorage } from './index.js'

describe(`${stubLocalStorage.name}()`, () => {
	it('keeps the type as Storage', () => {
		const actual = stubLocalStorage({})

		testType.equal<typeof actual, Storage>(true)
	})

	it('creates a stub of localStorage', () => {
		const actual = stubLocalStorage({
			getItem(key) {
				return key
			}
		})

		expect(actual.getItem('hello')).toBe('hello')
	})
})

describe(`${stubSessionStorage.name}()`, () => {
	it('keeps the type as Storage', () => {
		const actual = stubSessionStorage({})

		testType.equal<typeof actual, Storage>(true)
	})

	it('creates a stub of sessionStorage', () => {
		const actual = stubSessionStorage({
			getItem(key) {
				return key
			}
		})

		expect(actual.getItem('hello')).toBe('hello')
	})
})
