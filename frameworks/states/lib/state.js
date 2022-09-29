"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createState = exports.stateLog = void 0;
const log_1 = require("@just-web/log");
const tersify_1 = require("tersify");
exports.stateLog = (0, log_1.getLogger)('@just-web/states:state');
function createState(init) {
    const handlers = [];
    let value = Object.freeze(init);
    function set(newValue, meta) {
        var _a;
        if (Object.is(value, newValue))
            return;
        const old = value;
        value = Object.freeze(newValue);
        const log = (_a = meta === null || meta === void 0 ? void 0 : meta.logger) !== null && _a !== void 0 ? _a : exports.stateLog;
        log.planck(`state changed:`, old, value);
        handlers.forEach(h => h(value, old));
    }
    function onChange(handler, meta) {
        var _a;
        if (handlers.includes(handler))
            return () => { };
        const log = (_a = meta === null || meta === void 0 ? void 0 : meta.logger) !== null && _a !== void 0 ? _a : exports.stateLog;
        log.trace(`new onChange handler: ${(0, tersify_1.tersify)(handler)}`);
        handlers.push(handler);
        return () => { handlers.splice(handlers.indexOf(handler), 1); };
    }
    function reset() { set(init); }
    return [
        value,
        set,
        onChange,
        reset
    ];
}
exports.createState = createState;
//# sourceMappingURL=state.js.map