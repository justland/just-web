import { Draft } from 'immer';
import { ArrayValue, KeyTypes, Pick } from 'type-plus';
import { Store } from './store';
export interface Adder<T> {
    (...entries: T[]): void;
}
export interface WithAdder<T> {
    add: Adder<T>;
}
export declare function adder<A extends Array<any>, S extends Store<A>>(store: Pick<S, 'get' | 'set'>, addEntry: (record: Draft<A>, entry: ArrayValue<A>) => void): Adder<ArrayValue<A>>;
export declare function adder<T, K extends KeyTypes, S extends Store<Record<K, T>>>(store: Pick<S, 'get' | 'set'>, addEntry: (record: Draft<Record<K, T>>, entry: T) => void): Adder<T>;
export declare function withAdder<A extends Array<any>, S extends Store<A>>(store: Pick<S, 'get' | 'set'>, addEntry: (record: Draft<A>, entry: ArrayValue<A>) => void): S & WithAdder<ArrayValue<A>>;
export declare function withAdder<T, K extends KeyTypes, S extends Store<Record<K, T>>>(store: Pick<S, 'get' | 'set'>, addEntry: (record: Draft<Record<K, T>>, entry: T) => void): S & WithAdder<T>;
export declare function push<A extends Array<any>>(record: Draft<A>, entry: ArrayValue<A>): void;
export declare function unshift<A extends Array<any>>(record: Draft<A>, entry: ArrayValue<A>): void;
//# sourceMappingURL=adder.d.ts.map