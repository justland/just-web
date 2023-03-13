import { appBuilder } from './app_builder.js'

it(`requires a name`, async () => {
	const app = await appBuilder({ name: 'app-name' }).build()

	expect(app.name).toEqual('app-name')
})

it('generates an 15 chars long app id', async () => {
	const app = await appBuilder({ name: 'test' }).build()

	expect(app.id.length).toEqual(15)
})
