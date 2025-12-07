import { justTestApp } from '@just-web/app/testing'
import { it } from 'vitest'
import { createIntlCache, formatJSGizmoFn } from './index.js'

it('exports createIntlCache() to provide cache support', async () => {
	await justTestApp()
		.with(
			formatJSGizmoFn({
				config: { locale: 'en' },
				cache: createIntlCache()
			})
		)
		.create()
})
