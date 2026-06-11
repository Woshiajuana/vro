import type { ExtractPropTypes } from 'vue'

export const vroAspectRatioProps = {
  value: {
    type: Number,
    default: 1,
  },
}

export type VroAspectRatioProps = ExtractPropTypes<typeof vroAspectRatioProps>
