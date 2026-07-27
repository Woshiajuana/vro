import { type DeepPartial } from '@vrojs/base'
import type { ExtractPropTypes, PropType } from 'vue'

import type { Locale } from '../locale'

export type VroVanLocale = DeepPartial<Locale>

export const vroVanConfigProviderProps = {
  /**
   * 是否同步为全局配置，用于函数式组件等脱离当前组件树的场景。
   */
  global: {
    type: Boolean,
    default: true,
  },
  /**
   * 组件内部文案配置，支持局部覆盖。
   */
  locale: {
    type: Object as PropType<VroVanLocale>,
    default: () => ({}),
  },
}

export type VroVanConfigProviderProps = ExtractPropTypes<typeof vroVanConfigProviderProps>
