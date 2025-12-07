import { expect, it } from 'vitest'

import { stubStorage } from './testing/index.js'

it('key', () => {
	const s = stubStorage()
	expect(s.key(0)).toBeNull()

	s.setItem('key', 'value')
	expect(s.key(0)).toBe('key')
})
