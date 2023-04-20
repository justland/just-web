import { justTestApp } from '@just-web/app/testing'
import { osGizmo } from './index.js'

it('exposes isMac()', async () => {
	const { os } = await justTestApp().with(osGizmo).create()

	expect(os.isMac).toBeDefined()
})
