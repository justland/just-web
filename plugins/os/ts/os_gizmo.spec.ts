import { incubate } from '@just-web/framework'
import { osGizmo } from './index.js'

it('exposes isMac()', async () => {
	const { os } = await incubate().with(osGizmo).create()

	expect(os.isMac).toBeDefined()
})
