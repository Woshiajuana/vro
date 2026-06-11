import { inject } from 'vue'

import { LOCALE } from '../utils'
import { vroElConfigInjectionKey } from './injection'

export function useVroElConfig() {
  return inject(vroElConfigInjectionKey, { locale: LOCALE })
}
