import { nothing } from 'immer'

export type { Draft } from 'immer'
export { nothing }

export function isNothing(value: unknown): value is typeof nothing {
	return value === nothing
}
