import type { ExtractPropTypes, PropType } from 'vue'

import type { VroElImageProps } from '../vro-el-image'

export interface VroElImageUploadCallback<T = any> {
  (
    files: File[],
    options: {
      compress: boolean
      params: T
    },
  ): Promise<string[]>
}

export const vroElImageUploadProps = {
  imageProps: Object as PropType<Partial<VroElImageProps>>,
  modelValue: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
  max: {
    type: Number,
    default: 1,
  },
  compressible: [Boolean, Object] as PropType<boolean | { value: boolean }>,
  disabled: Boolean,
  params: Object as PropType<Record<string, any>>,
  upload: Function as PropType<VroElImageUploadCallback>,
}

export type VroElImageUploadProps = ExtractPropTypes<typeof vroElImageUploadProps>
