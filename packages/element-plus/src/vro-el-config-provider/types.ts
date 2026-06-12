import type { ExtractPropTypes, PropType } from 'vue'

import type { Locale } from '../locale'

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

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

export type VroElConfigProviderContext = {
  locale: Locale
}
