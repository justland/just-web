import { isType } from 'type-plus'
import { enableAllPlugins, enableES5, enableMapSet, enablePatches } from '.'

test('export immer feature methods', () => {
  isType.equal<false, undefined, typeof enableES5>()
  isType.equal<false, undefined, typeof enableAllPlugins>()
  isType.equal<false, undefined, typeof enableMapSet>()
  isType.equal<false, undefined, typeof enablePatches>()
})
