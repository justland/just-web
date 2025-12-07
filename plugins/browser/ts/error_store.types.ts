import type { ReadonlyStore, Store, WithAdder } from '@just-web/states'

export interface ErrorStore extends Store<Error[]>, WithAdder<Error> {}

export interface ReadonlyErrorStore extends ReadonlyStore<Error[]> {}
