import type { InjectionKey } from 'vue'

import type { VroElConfigProviderContext } from './types'

export const vroElConfigInjectionKey = Symbol(
  'vroElConfigInjectionKey',
) as InjectionKey<VroElConfigProviderContext>
