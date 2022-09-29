import { Logger } from '@just-web/log';
export declare const stateLog: Logger<import("@just-web/log").LogMethodNames>;
export interface SetState<T> {
    (value: T, meta?: {
        logger?: Logger;
    }): void;
}
export interface StateChangeHandler<T> {
    (value: T, prev: T): void;
}
export interface OnStateChange<T> {
    (handler: StateChangeHandler<T>, meta?: {
        logger?: Logger;
    }): () => void;
}
export interface ResetState {
    (): void;
}
export declare function createState<T>(init: T): [T, SetState<T>, OnStateChange<T>, ResetState];
//# sourceMappingURL=state.d.ts.map