import { isType } from 'type-plus'
import { Simple2Plugin } from './plugin.fixtures.simple2.js'
import { definePlugin } from './plugin.js'
import { Plugin } from './plugin.types.js'

export const simplePlugin = definePlugin(() => ({
	name: 'simple',
	async define() {
		return {
			simple: {
				foo(): number {
					return 1
				}
			}
		}
	}
}))

export const requiredPlugin = definePlugin(() => ({
	name: 'required',
	required: [simplePlugin],
	async define(ctx) {
		isType.equal<true, Plugin.Loader & { simple: { foo(): number } }, typeof ctx>()
		return {
			required: {
				foo() {
					return ctx.simple.foo() + 1
				}
			}
		}
	}
}))

export const optionalPlugin = definePlugin(() => ({
	name: 'optional',
	optional: [simplePlugin],
	async define(ctx) {
		isType.equal<true, Plugin.Loader & { simple?: { foo(): number } }, typeof ctx>()
		return {
			optional: {
				foo(): number {
					return ctx.simple?.foo() ?? 2
				}
			}
		}
	}
}))

export const requiredBothPlugin = definePlugin(() => ({
	name: 'required-both',
	required: [optionalPlugin, requiredPlugin],
	async define(ctx) {
		isType.equal<
			true,
			Plugin.Loader & { optional: { foo(): number }; required: { foo(): number } },
			typeof ctx
		>()
		return {
			required_both: {
				optional() {
					return ctx.optional.foo()
				},
				required() {
					return ctx.required.foo()
				}
			}
		}
	}
}))

export const optionalBothPlugin = definePlugin(() => ({
	name: 'optional-both',
	optional: [optionalPlugin, requiredPlugin],
	async define(ctx) {
		isType.equal<
			true,
			Plugin.Loader & { optional?: { foo(): number }; required?: { foo(): number } },
			typeof ctx
		>()
		return {
			optional_both: {
				optional() {
					return ctx.optional?.foo()
				},
				required() {
					return ctx.required?.foo()
				}
			}
		}
	}
}))

export const mixPlugin = definePlugin(() => ({
	name: 'optional-both',
	required: [requiredPlugin],
	optional: [optionalPlugin],
	async define(ctx) {
		isType.equal<
			true,
			Plugin.Loader & { optional?: { foo(): number }; required: { foo(): number } },
			typeof ctx
		>()
		return {
			optional_both: {
				optional() {
					return ctx.optional?.foo()
				},
				required() {
					return ctx.required.foo()
				}
			}
		}
	}
}))

export const useDynamicPlugin = definePlugin<[Simple2Plugin]>(() => ({
	name: 'use-dynamic',
	async define(ctx) {
		const d = await ctx.load<Simple2Plugin>('simple2')
		return {
			dynamic: {
				foo() {
					return d.simple2.foo()
				}
			}
		}
	}
}))
