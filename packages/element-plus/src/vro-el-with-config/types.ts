import type { ConfigProviderProps } from 'element-plus'
import type { Component, ExtractPropTypes, PropType } from 'vue'

export const vroElWithConfigProps = {
  elConfigProps: {
    type: Object as PropType<Partial<ConfigProviderProps>>,
    default: () => ({}),
  },
  is: [String, Object] as PropType<string | Component>,
}

export type VroElWithConfigProps = ExtractPropTypes<typeof vroElWithConfigProps>
