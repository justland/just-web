import type {
	LogMethodNames,
	StandardLogOptions
} from 'standard-log'

export type LogGizmoOptions<N extends string = LogMethodNames> = StandardLogOptions<N>
