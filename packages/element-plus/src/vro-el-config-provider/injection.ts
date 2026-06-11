import type { InjectionKey } from 'vue'

import type { VroElConfigProviderProps } from './types'

export const vroElConfigInjectionKey = Symbol(
  'vroElConfigInjectionKeys',
) as InjectionKey<VroElConfigProviderProps>
