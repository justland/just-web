import { justTestApp } from '@just-web/app/testing'
import { osTestGizmoFn } from './testing/index.js'

it('can mock isMac()', async () => {
	const { os } = await justTestApp()
		.with(osTestGizmoFn({ isMac: () => true }))
		.create()

	expect(os.isMac()).toBe(true)
})

it('options is optional', async () => {
	justTestApp().with(osTestGizmoFn())
})
