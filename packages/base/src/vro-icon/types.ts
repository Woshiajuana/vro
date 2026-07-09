import type { ExtractPropTypes } from 'vue'

export const vroIconProps = {
  prefix: {
    type: String,
    default: 'iconfont',
  },
}

export type VroIconProps = ExtractPropTypes<typeof vroIconProps>
