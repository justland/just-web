"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toReadonlyStore = exports.createStore = void 0;
const log_1 = require("@just-web/log");
const immer_1 = __importDefault(require("immer"));
const type_plus_1 = require("type-plus");
const state_1 = require("./state");
function createStore(value) {
    const state = (0, state_1.createState)(value);
    const [, set, onChange, reset] = state;
    onChange(v => state[0] = v, { logger: (0, log_1.getLogger)('noop', { level: log_1.logLevels.none }) });
    return {
        get() { return state[0]; },
        set,
        update(handler) { set((0, immer_1.default)(state[0], handler)); },
        onChange,
        reset
    };
}
exports.createStore = createStore;
function toReadonlyStore(store) {
    return (0, type_plus_1.pick)(store, 'get', 'onChange');
}
exports.toReadonlyStore = toReadonlyStore;
//# sourceMappingURL=store.js.map