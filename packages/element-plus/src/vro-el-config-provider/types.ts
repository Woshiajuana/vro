import { DeepPartial } from '@vrojs/base'
import type { ExtractPropTypes, PropType } from 'vue'

import type { Locale } from '../locale'

export type VroElLocale = DeepPartial<Locale>

export const vroElConfigProviderProps = {
  /**
   * 组件内部文案配置，支持局部覆盖。
   */
  locale: {
    type: Object as PropType<VroElLocale>,
    default: () => ({}),
  },
}

export type VroElConfigProviderProps = ExtractPropTypes<typeof vroElConfigProviderProps>
