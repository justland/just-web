import { nothing } from 'immer'

export function isNothing(value: unknown): value is typeof nothing {
	return value === nothing
}
