import { createTestApp } from '@just-web/app';
import { logTestPlugin } from '@just-web/log';
import presetsBrowserPlugin from '@just-web/presets-browser';
import { createState } from '@just-web/states';
export async function main() {
    const app = await createTestApp({ name: 'browser-app' })
        .extend(logTestPlugin())
        .extend(presetsBrowserPlugin());
    await app.start();
    const [value] = createState('hello');
    app.log.info('started', value);
}
//# sourceMappingURL=index.js.map