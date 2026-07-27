import type { ConfigProviderProps } from 'vant'
import type { Component, ExtractPropTypes, PropType } from 'vue'

import type { VroVanConfigProviderProps } from '../vro-van-config-provider'

export const vroVanWithConfigProps = {
  vanConfigProps: {
    type: Object as PropType<Partial<ConfigProviderProps>>,
    default: () => ({}),
  },
  vroConfigProps: {
    type: Object as PropType<Partial<VroVanConfigProviderProps>>,
    default: () => ({}),
  },
  is: [String, Object] as PropType<string | Component>,
}

export type VroVanWithConfigProps = ExtractPropTypes<typeof vroVanWithConfigProps>
