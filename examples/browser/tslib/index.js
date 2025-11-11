"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const app_1 = require("@just-web/app");
const commands_1 = require("@just-web/commands");
const presets_browser_1 = require("@just-web/presets-browser");
const states_1 = require("@just-web/states");
async function main() {
    const app = await (0, app_1.justApp)({ name: 'browser-app' })
        .with((0, commands_1.commandsGizmoFn)())
        .with((0, presets_browser_1.presetsBrowserGizmoFn)())
        .with(states_1.statesGizmo)
        .create();
    const [value] = (0, states_1.createState)('hello');
    app.log.info('started', value);
}
//# sourceMappingURL=index.js.map