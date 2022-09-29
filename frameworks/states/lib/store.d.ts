import { OnStateChange, ResetState, SetState } from './state';
export interface ReadonlyStore<T> {
    get(): T;
    onChange: OnStateChange<T>;
}
export interface Store<T> extends ReadonlyStore<T> {
    set: SetState<T>;
    update: (handler: (draft: T) => T | void) => void;
    reset: ResetState;
}
export declare function createStore<T>(value: T): Store<T>;
export declare function toReadonlyStore<S extends Store<any>>(store: S): S extends Store<infer T> ? ReadonlyStore<T> : never;
//# sourceMappingURL=store.d.ts.map