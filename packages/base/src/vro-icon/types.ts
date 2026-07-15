import type { ExtractPropTypes, PropType } from 'vue'

export const vroIconProps = {
  name: String,
  fontFamily: {
    type: String,
    default: 'iconfont',
  },
  color: String,
  size: [String, Number],
  loading: [Boolean, String] as PropType<boolean | string>,
}

export type VroIconProps = ExtractPropTypes<typeof vroIconProps>
