import { justTestApp } from '@just-web/app/testing'
import { testType } from 'type-plus'
import { formatJSGizmoFn, type IntlShape } from './index.js'

it('provides formatjs.intl', async () => {
	const app = await justTestApp()
		.with(formatJSGizmoFn({ config: { locale: 'en' } }))
		.create()

	testType.equal<typeof app.formatjs.intl, IntlShape>(true)
	expect(app.formatjs.intl).toBeDefined()
})
