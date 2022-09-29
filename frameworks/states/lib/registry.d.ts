import { KeyTypes, Widen } from 'type-plus';
import { OnStateChange, ResetState, SetState } from './state';
export interface ReadonlyRegistry<K extends KeyTypes, T> {
    get(): Record<K, T>;
    onChange: OnStateChange<Record<K, T>>;
    keys(): K[];
    size(): number;
    list(): T[];
}
export interface Registry<K extends KeyTypes, T> extends ReadonlyRegistry<K, T> {
    set: SetState<Record<K, T>>;
    update: (handler: (draft: Record<K, T>) => Record<K, T> | void) => void;
    reset: ResetState;
}
export declare function createRegistry<K extends KeyTypes, T>(init?: Record<K, T>): Registry<Widen<K>, T>;
export declare function toReadonlyRegistry<S extends Registry<any, any>>(registry: S): S extends Registry<infer K, infer T> ? ReadonlyRegistry<K, T> : never;
//# sourceMappingURL=registry.d.ts.map