import type { ExtractPropTypes, PropType } from 'vue'

import type { VroElImageProps } from '../vro-el-image/types'

export type VroElImageUploadItem = string | File
export type VroElImageUploadModelValue = string | VroElImageUploadItem[]
export type VroElImageUploadUploadResult = string[] | File[]

export interface VroElImageUploadCallback<T = any> {
  (
    /** 当前待上传的图片文件列表 */
    files: File[],
    options: {
      /** 是否开启压缩 */
      compress: boolean
      /** 上传时透传的自定义参数 */
      params: T
    },
  ): Promise<VroElImageUploadUploadResult>
}

export const vroElImageUploadProps = {
  /** 绑定值，字符串为单图远程地址，数组为多图或本地 File 列表 */
  modelValue: {
    type: [String, Array] as PropType<VroElImageUploadModelValue>,
    default: '',
  },
  /** 最多可上传的图片数量 */
  max: {
    type: Number,
    default: 1,
  },
  /** 是否禁用上传、删除和排序 */
  disabled: Boolean,
  /** 是否显示压缩开关，传入对象时可作为响应式默认值 */
  compressible: [Boolean, Object] as PropType<boolean | { value: boolean }>,
  /** 上传时透传给 upload 回调的自定义参数 */
  params: Object as PropType<Record<string, any>>,
  /** 透传给 Element Plus Image 的属性 */
  imageProps: Object as PropType<Partial<VroElImageProps>>,
  /** 自定义上传方法，默认返回 File 列表用于本地预览和后续业务处理 */
  upload: Function as PropType<VroElImageUploadCallback>,
}

export type VroElImageUploadProps = ExtractPropTypes<typeof vroElImageUploadProps>
