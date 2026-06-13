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
  /**
   * 绑定值。单文件时可传字符串，多文件时传字符串数组。
   */
  modelValue: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },

  /**
   * 原生文件选择 accept 属性。
   */
  accept: String,

  /**
   * 最大上传数量。
   */
  max: {
    type: Number,
    default: 1,
  },

  /**
   * 是否禁用上传和删除。
   */
  disabled: Boolean,

  /**
   * 上传时透传给 upload 回调的自定义参数。
   */
  params: Object as PropType<Record<string, any>>,

  /**
   * 上传回调，接收本次选择的文件列表，返回文件访问地址列表。
   */
  upload: Function as PropType<VroElFileUploadCallback>,
}

export type VroElFileUploadProps = ExtractPropTypes<typeof vroElFileUploadProps>
