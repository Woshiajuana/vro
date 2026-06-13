import type { ExtractPropTypes, PropType } from 'vue'

export interface VroElFileUploadCallback<T = any> {
  (
    files: File[],
    options: {
      params: T
    },
  ): Promise<string[]>
}

export const vroElFileUploadProps = {
  modelValue: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
  accept: String,
  max: {
    type: Number,
    default: 1,
  },
  disabled: Boolean,
  params: Object as PropType<Record<string, any>>,
  upload: Function as PropType<VroElFileUploadCallback>,
}

export type VroElFileUploadProps = ExtractPropTypes<typeof vroElFileUploadProps>
