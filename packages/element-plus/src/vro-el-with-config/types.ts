import type { ConfigProviderProps } from 'element-plus'
import type { Component, ExtractPropTypes, PropType } from 'vue'

import type { VroElConfigProviderProps } from '../vro-el-config-provider'

export const vroElWithConfigProps = {
  elConfigProps: {
    type: Object as PropType<Partial<ConfigProviderProps>>,
    default: () => ({}),
  },
  vroConfigProps: {
    type: Object as PropType<Partial<VroElConfigProviderProps>>,
    default: () => ({}),
  },
  is: [String, Object] as PropType<string | Component>,
}

export type VroElWithConfigProps = ExtractPropTypes<typeof vroElWithConfigProps>
