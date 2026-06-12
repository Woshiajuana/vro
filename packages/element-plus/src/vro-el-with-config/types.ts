import type { ConfigProviderProps } from 'element-plus'
import type { ExtractPropTypes, PropType } from 'vue'

export const vroElWithConfigProps = {
  elConfigProps: Object as PropType<ConfigProviderProps>,
  is: [String, Object] as PropType<any>,
}

export type VroElWithConfigProps = ExtractPropTypes<typeof vroElWithConfigProps>
