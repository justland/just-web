import type {
	Logger,
	LogMethodNames,
	StandardLog,
	StandardLogForTest,
	StandardLogOptions
} from 'standard-log'
import type { Plugin } from './plugin.types.js'

export type LogOptions<N extends string = LogMethodNames> = {
	log?: StandardLogOptions<N>
}

export type LogPlugin<N extends string = LogMethodNames> = Plugin<
	{
		log: StandardLog<N> & Omit<Logger<LogMethodNames | N>, 'id' | 'level' | 'write'>
	},
	[options: LogOptions<N>]
>

export type TestLogOptions<N extends string = LogMethodNames> = {
	log?: Partial<Omit<StandardLogOptions<N>, 'reporters'>>
}

export type TestLogPlugin<N extends string = LogMethodNames> = Plugin<
	{
		log: StandardLogForTest<N> & Omit<Logger<LogMethodNames | N>, 'id' | 'level' | 'write'>
	},
	[options: TestLogOptions<N>]
>
