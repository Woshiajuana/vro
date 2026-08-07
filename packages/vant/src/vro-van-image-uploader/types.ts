import type { ExtractPropTypes, InputHTMLAttributes, PropType } from 'vue'

import type { VroVanImageProps } from '../vro-van-image'

export type VroVanImageUploaderItem = string | File
export type VroVanImageUploaderModelValue = string | VroVanImageUploaderItem[]
export type VroVanImageUploaderResult = string[] | File[]

export interface VroVanImageUploaderCallback<T = any> {
  (
    /** 当前待上传的图片文件列表 */
    files: File[],
    options: {
      /** 是否开启压缩 */
      compress: boolean
      /** 上传时透传的自定义参数 */
      params: T
    },
  ): Promise<VroVanImageUploaderResult>
}

export interface VroVanImageUploaderPresetItem {
  label: string
  required: string
}

export const vroVanImageUploaderProps = {
  /**
   * 绑定值，字符串为单图远程地址，数组为多图或本地 File 列表。
   */
  modelValue: {
    type: [String, Array] as PropType<VroVanImageUploaderModelValue>,
    default: '',
  },

  /**
   * 最多可上传的图片数量。
   */
  max: {
    type: Number,
    default: 1,
  },

  /**
   * 是否禁用上传、删除和排序。
   */
  disabled: Boolean,

  /**
   * 上传时透传给 upload 回调的自定义参数。
   */
  params: Object as PropType<Record<string, any>>,

  /**
   * 透传给 VroVanImage 的属性。
   */
  imageProps: Object as PropType<Partial<VroVanImageProps>>,

  /**
   * 自定义上传方法，默认返回 File 列表用于本地预览和后续业务处理。
   */
  upload: Function as PropType<VroVanImageUploaderCallback>,

  accept: {
    type: String as PropType<InputHTMLAttributes['accept']>,
    default: 'image/*',
  },

  multiple: Boolean,

  /**
   * 选择资源
   */
  chooseMedia: Function as PropType<() => any>,

  /**
   * 预设
   */
  preset: Array as PropType<VroVanImageUploaderPresetItem[]>,
}

export type VroVanImageUploaderProps = ExtractPropTypes<typeof vroVanImageUploaderProps>
