import { inject } from 'vue'

import { LOCALE } from '../locale'
import { vroElConfigInjectionKey } from './injection'

export function useVroElConfig() {
  return inject(vroElConfigInjectionKey, { locale: LOCALE })
}
