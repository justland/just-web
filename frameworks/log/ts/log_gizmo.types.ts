import type { LogMethodNames, StandardLogOptions } from 'standard-log'
import { LoggerOptions, type Logger, type StandardLog } from 'standard-log'
import type { Omit } from 'type-plus'

export type LogGizmoOptions<N extends string = LogMethodNames> = StandardLogOptions<N>

export type GizmoLog<N extends string = LogMethodNames> = Omit<StandardLog<N>, 'getLogger'> &
	Omit<Logger<LogMethodNames | N>, 'id' | 'level' | 'write'> & {
		getLogger(id?: string, options?: LoggerOptions): Logger<LogMethodNames | N>
	}
