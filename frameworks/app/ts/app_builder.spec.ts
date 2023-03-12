import { appBuilder } from './app_builder.js'

it(`requires a name`, async () => {
	const builder = appBuilder({ name: 'app-name' })
	const app = await builder.build()
	expect(app.name).toEqual('app-name')
})
