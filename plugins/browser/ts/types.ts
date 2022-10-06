import type { ReadonlyStore } from '@just-web/states'

export interface ReadonlyErrorStore extends ReadonlyStore<Error[]> { }
