import { imageProps } from 'element-plus'
import type { ExtractPropTypes, PropType } from 'vue'

export type VroElImageNormalizeSrc = (options: {
  src: string
  ratio?: string | number
  baseUrl?: string
}) => string

export const vroElImageProps = {
  ...imageProps,
  previewTeleported: {
    type: Boolean,
    default: true,
  },
  baseUrl: String,
  ratio: [String, Number],
  previewRatio: [String, Number],
  normalizeSrc: Function as PropType<VroElImageNormalizeSrc>,
}

export type VroElImageProps = ExtractPropTypes<typeof vroElImageProps>
