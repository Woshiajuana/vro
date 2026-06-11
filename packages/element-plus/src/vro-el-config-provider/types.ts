import type { ExtractPropTypes, PropType } from 'vue'

import { Locale } from '../utils'

export const vroElConfigProviderProps = {
  locale: {
    type: Object as PropType<Locale>,
    default: () => ({}),
  },
}

export type VroElConfigProviderProps = ExtractPropTypes<typeof vroElConfigProviderProps>
