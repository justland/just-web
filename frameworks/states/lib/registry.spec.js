"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_plus_1 = require("type-plus");
const _1 = require(".");
const registry_1 = require("./registry");
describe('createRegistry()', () => {
    test('create empty registry', () => {
        const a = (0, _1.createRegistry)();
        expect(a.size()).toBe(0);
        type_plus_1.isType.equal();
    });
    test('create with initial records', () => {
        const a = (0, _1.createRegistry)({ a: 1, b: 2 });
        expect(a.size()).toBe(2);
        type_plus_1.isType.equal();
    });
    test('key of the init record can be symbol', () => {
        const s = Symbol();
        const a = (0, _1.createRegistry)({ [s]: 's', b: 'b' });
        expect(a.size()).toBe(2);
        expect(a.get()[s]).toBe('s');
        type_plus_1.isType.equal();
    });
    describe('keys()', () => {
        test('get both string and symbol keys', () => {
            const s = Symbol();
            const a = (0, _1.createRegistry)({ [s]: 's', b: 'b' });
            expect(a.keys()).toEqual(['b', s]);
        });
    });
    describe('list()', () => {
        test('list all values', () => {
            const s = Symbol();
            const a = (0, _1.createRegistry)({ [s]: 's', b: 'b' });
            expect(a.list()).toEqual(['b', 's']);
        });
    });
});
describe('toReadonlyRegistry()', () => {
    test('usage', () => {
        const s = (0, _1.createRegistry)({ a: 1 });
        const r = (0, registry_1.toReadonlyRegistry)(s);
        expect(Object.keys(r)).toEqual(['get', 'onChange', 'keys', 'size', 'list']);
        type_plus_1.isType.equal();
    });
});
//# sourceMappingURL=registry.spec.js.map