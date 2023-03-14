"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const app_1 = require("@just-web/app");
const log_1 = require("@just-web/log");
const presets_browser_1 = __importDefault(require("@just-web/presets-browser"));
const states_1 = require("@just-web/states");
async function main() {
    const app = await (0, app_1.createTestApp)({ name: 'browser-app' })
        .extend((0, log_1.logTestPlugin)())
        .extend((0, presets_browser_1.default)());
    await app.start();
    const [value] = (0, states_1.createState)('hello');
    app.log.info('started', value);
}
exports.main = main;
//# sourceMappingURL=index.js.map