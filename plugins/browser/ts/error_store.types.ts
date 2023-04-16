import type { ReadonlyStore } from '@just-web/states'
import { type Store, type WithAdder } from '@just-web/states'

export interface ErrorStore extends Store<Error[]>, WithAdder<Error> {}

export interface ReadonlyErrorStore extends ReadonlyStore<Error[]> {}
