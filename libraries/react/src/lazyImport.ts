import { AppContext, PluginModule } from '@just-web/app'
import { ComponentType, lazy } from 'react'

export function lazyImport<
  M extends PluginModule<any>,
  C extends ComponentType<any>
>(
  getApp: () => Pick<AppContext, 'addPlugin'>,
  importPlugin: () => Promise<M>,
  getComponent: (m: M) => C
): React.LazyExoticComponent<C> {
  return lazy(async () => {
    const m = await importPlugin() as unknown as M
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await (getApp() as any).addPlugin(m)

    return { default: getComponent(m) }
  })
}
