import type { AppContext, PluginModule } from '@just-web/app'
import { ComponentType, lazy } from 'react'

export function lazyImport<
  M extends PluginModule<any, any>,
  C extends ComponentType<any>
>(
  getApp: () => Pick<AppContext, 'addPlugin'>,
  importPlugin: () => Promise<M>,
  getComponent: (m: M) => C
): React.LazyExoticComponent<C> {
  return lazy(async () => {
    const m = await importPlugin() as unknown as M
    await getApp().addPlugin(m)

    return { default: getComponent(m) }
  })
}
