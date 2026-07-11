import type { ExtractPropTypes } from 'vue'

export const vroIconProps = {
  name: String,
  fontFamily: {
    type: String,
    default: 'iconfont',
  },
  color: {
    type: String,
    default: 'inherit',
  },
  size: {
    type: [String, Number],
    default: 'inherit',
  },
  loading: Boolean,
}

export type VroIconProps = ExtractPropTypes<typeof vroIconProps>
