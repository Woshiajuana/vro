import type { ExtractPropTypes } from 'vue'

export const vroAspectRatioProps = {
  /**
   * 宽高比，等价于 width / height
   *
   * @default 1
   */
  ratio: {
    type: Number,
    default: 1,
  },
}

export type VroAspectRatioProps = ExtractPropTypes<typeof vroAspectRatioProps>
