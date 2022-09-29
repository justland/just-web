"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unshift = exports.push = exports.withAdder = exports.adder = void 0;
const immer_1 = __importDefault(require("immer"));
function adder(store, addEntry) {
    return function (...entries) {
        store.set((0, immer_1.default)(store.get(), s => entries.forEach(entry => addEntry(s, entry))));
    };
}
exports.adder = adder;
function withAdder(store, addEntry) {
    return {
        ...store,
        add: adder(store, addEntry)
    };
}
exports.withAdder = withAdder;
function push(record, entry) {
    record.push(entry);
}
exports.push = push;
function unshift(record, entry) {
    record.unshift(entry);
}
exports.unshift = unshift;
//# sourceMappingURL=adder.js.map