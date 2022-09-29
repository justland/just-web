"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toReadonlyRegistry = exports.createRegistry = void 0;
const type_plus_1 = require("type-plus");
const store_1 = require("./store");
function createRegistry(init) {
    const store = (0, store_1.createStore)((0, type_plus_1.record)(init));
    return {
        ...store,
        keys() {
            const r = store.get();
            return [...Object.keys(r), ...Object.getOwnPropertySymbols(r)];
        },
        size() {
            return this.keys().length;
        },
        list() {
            const r = store.get();
            return this.keys().map(k => r[k]);
        }
    };
}
exports.createRegistry = createRegistry;
function toReadonlyRegistry(registry) {
    return (0, type_plus_1.pick)(registry, 'get', 'onChange', 'keys', 'size', 'list');
}
exports.toReadonlyRegistry = toReadonlyRegistry;
//# sourceMappingURL=registry.js.map