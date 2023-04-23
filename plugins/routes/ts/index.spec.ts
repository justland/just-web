import { justTestApp } from '@just-web/app/testing'
import { routesGizmo } from './routes_gizmo.js'

describe('start()', () => {
	test('configure initial route', async () => {
		let called = false
		const app = await justTestApp().with(routesGizmo).create()

		app.routes.register('/intro', () => (called = true))
		app.routes.config({ initialRoute: '/intro' })
		app.routes.navigate()
		expect(called).toBe(true)
	})
})
