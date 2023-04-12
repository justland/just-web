import { JustWebFrameworkError } from './errors.js'

it('set module as @just-web', () => {
	const e = new JustWebFrameworkError('some message')
	expect(e.module).toBe('@just-web/framework')
})
