import { iconProps } from 'element-plus'
import type { ExtractPropTypes, PropType, Raw } from 'vue'

export const vroElIconProps = {
  ...iconProps,
  name: {
    type: [String, Object] as PropType<string | Raw<object>>,
    default: '',
  },
}

export type VroElIconProps = ExtractPropTypes<typeof vroElIconProps>
