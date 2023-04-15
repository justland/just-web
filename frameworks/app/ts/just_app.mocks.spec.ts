import { justTestApp } from './just_app.mocks.js'

it('can be called without param', () => {
	justTestApp()
})

it('provides log.reporter', async () => {
	const { log } = await justTestApp().create()
	expect(log.reporter).toBeDefined()
})
