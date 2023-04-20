import { justTestApp } from '@just-web/app/testing'
import { osTestGizmoFn } from './testing/index.js'

it('can mock isMac()', async () => {
	const { os } = await justTestApp()
		.with(osTestGizmoFn({ os: { isMac: () => true } }))
		.create()

	expect(os.isMac()).toBe(true)
})
