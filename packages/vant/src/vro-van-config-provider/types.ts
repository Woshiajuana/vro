import { type DeepPartial } from '@vrojs/base'
import type { ExtractPropTypes, PropType } from 'vue'

import type { Locale } from '../locale'

export type VroVanLocale = DeepPartial<Locale>

export const vroVanConfigProviderProps = {
  /**
   * 组件内部文案配置，支持局部覆盖。
   */
  locale: {
    type: Object as PropType<VroVanLocale>,
    default: () => ({}),
  },
}

export type VroVanConfigProviderProps = ExtractPropTypes<typeof vroVanConfigProviderProps>
