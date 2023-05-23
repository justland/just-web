import { stubStorage } from './browser_gizmo.testing.js'

it('key', () => {
	const s = stubStorage()
	expect(s.key(0)).toBeNull()

	s.setItem('key', 'value')
	expect(s.key(0)).toBe('key')
})
