import { justTestApp } from '@just-web/app/testing'
import { a, some } from 'assertron'
import { routesGizmo } from './routes_gizmo.js'

describe('register()', () => {
	it('can register a route', async () => {
		const app = await justTestApp().with(routesGizmo).create()
		app.routes.register('/', () => {
			/* for SPA, here is where we render the app */
		})
	})

	it('log an error if registering an already registered route', async () => {
		const app = await justTestApp().with(routesGizmo).create()
		app.routes.register('/debug', () => {})
		app.routes.register('/debug', () => {})
		a.satisfies(
			app.log.reporter.getLogMessagesWithLevel(),
			some(`(ERROR) Registering an already registered route: '/debug'`)
		)
	})

	it('returns an unregister function', async () => {
		const app = await justTestApp().with(routesGizmo).create()
		const unregister = app.routes.register('/abc', () => {})
		unregister()
		expect(app.routes.hasRoute('/abc')).toBe(false)
	})
})

describe('navigate()', () => {
	it('logs an error when it is an unknown route', async () => {
		const app = await justTestApp().with(routesGizmo).create()
		app.routes.navigate('/not-exist')
		a.satisfies(
			app.log.reporter.getLogMessagesWithLevel(),
			some(`(ERROR) navigate target not found: '/not-exist'`)
		)
	})

	it('invokes registered route', async () => {
		expect.assertions(1)
		const app = await justTestApp().with(routesGizmo).create()
		app.routes.register('/route1', () => expect('called').toBe('called'))
		app.routes.navigate('/route1')
	})

	it.todo('uses initial route if no route is specified')
})
