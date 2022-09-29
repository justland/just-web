"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_plus_1 = require("type-plus");
const store_1 = require("./store");
describe('createStore()', () => {
    test('get() returns initial value', () => {
        const value = { a: 1 };
        const store = (0, store_1.createStore)(value);
        const a = store.get();
        expect(a).toStrictEqual(value);
    });
    test('get() value from set()', () => {
        const store = (0, store_1.createStore)({ a: 1 });
        const value = { a: 2 };
        store.set(value);
        const a = store.get();
        expect(a).toStrictEqual(value);
    });
    test('set() triggers onChange()', () => {
        const store = (0, store_1.createStore)({ a: 1 });
        let actual;
        store.onChange(v => actual = v);
        const value = { a: 2 };
        store.set(value);
        expect(actual).toStrictEqual(value);
    });
    test('update() by modify', () => {
        const store = (0, store_1.createStore)({ a: 1 });
        store.update(s => { s.a = 2; });
        const a = store.get();
        expect(a).toEqual({ a: 2 });
    });
    test('update() by return', () => {
        const store = (0, store_1.createStore)({ a: 1 });
        store.update(() => ({ a: 2 }));
        const a = store.get();
        expect(a).toEqual({ a: 2 });
    });
    test('NaN -> NaN does not trigger onChange()', () => {
        const store = (0, store_1.createStore)(NaN);
        store.onChange(() => { throw 'should not reach'; });
        store.set(NaN);
    });
    test('NaN -> number works as expected', () => {
        const store = (0, store_1.createStore)(NaN);
        store.set(123);
        expect(store.get()).toBe(123);
    });
});
describe('toReadonly()', () => {
    test('for scalar store', () => {
        const s = (0, store_1.createStore)(1);
        const r = (0, store_1.toReadonlyStore)(s);
        expect(Object.keys(r)).toEqual(['get', 'onChange']);
        type_plus_1.isType.equal();
    });
    test('for record store', () => {
        const s = (0, store_1.createStore)({ a: 1 });
        const r = (0, store_1.toReadonlyStore)(s);
        expect(Object.keys(r)).toEqual(['get', 'onChange']);
        type_plus_1.isType.equal();
    });
    test('for array store', () => {
        const s = (0, store_1.createStore)([1, 2]);
        const r = (0, store_1.toReadonlyStore)(s);
        expect(Object.keys(r)).toEqual(['get', 'onChange']);
        type_plus_1.isType.equal();
    });
});
//# sourceMappingURL=store.spec.js.map