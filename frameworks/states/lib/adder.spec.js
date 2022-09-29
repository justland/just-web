"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adder_1 = require("./adder");
const registry_1 = require("./registry");
const store_1 = require("./store");
describe('adder()', () => {
    test('creates an add function for store', () => {
        const store = (0, store_1.createStore)([]);
        const add = (0, adder_1.adder)(store, (array, entry) => { array.push(entry); });
        add('a', 'b');
        expect(store.get()).toEqual(['a', 'b']);
    });
    test('use provided push', () => {
        const store = (0, store_1.createStore)([]);
        const add = (0, adder_1.adder)(store, adder_1.push);
        add('a', 'b');
        expect(store.get()).toEqual(['a', 'b']);
    });
    test('use provided unshift', () => {
        const store = (0, store_1.createStore)([]);
        const add = (0, adder_1.adder)(store, adder_1.unshift);
        add('a', 'b');
        expect(store.get()).toEqual(['b', 'a']);
    });
    test('creates an add function for registry', () => {
        const store = (0, registry_1.createRegistry)({});
        const add = (0, adder_1.adder)(store, (record, entry) => record[entry.key] = entry);
        add({ key: 'a', value: 1 }, { key: 'b', value: 2 });
        expect(store.get()).toEqual({
            a: { key: 'a', value: 1 },
            b: { key: 'b', value: 2 }
        });
    });
});
describe('withAdder()', () => {
    test('for array store', () => {
        const store = (0, adder_1.withAdder)((0, store_1.createStore)([]), (array, entry) => { array.push(entry); });
        store.add('a', 'b');
        expect(store.get()).toEqual(['a', 'b']);
    });
    test('for record registry', () => {
        const registry = (0, adder_1.withAdder)((0, registry_1.createRegistry)(), (record, entry) => { record[entry.a] = entry; });
        registry.add({ a: 'x' }, { a: 'y' });
        expect(registry.get()).toEqual({ 'x': { 'a': 'x' }, 'y': { 'a': 'y' } });
    });
});
//# sourceMappingURL=adder.spec.js.map