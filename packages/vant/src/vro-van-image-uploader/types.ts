import type { ExtractPropTypes, InputHTMLAttributes, PropType } from 'vue'

import type { VroVanImageProps } from '../vro-van-image'

export type VroVanImageUploaderItem = string | File
export type VroVanImageUploaderModelValue = VroVanImageUploaderItem | VroVanImageUploaderItem[]
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

export interface VroVanImageUploaderChooseMediaParams<T = any> {
  /** 最多可选择数量 */
  max: number
  /** 当前绑定值 */
  value: VroVanImageUploaderItem[]
  /** 是否支持多选 */
  multiple: boolean
  /** 自定义上传方法 */
  upload: VroVanImageUploaderCallback<T>
}

export interface VroVanImageUploaderEmits {
  'update:modelValue': [value: VroVanImageUploaderModelValue]
  change: [value: VroVanImageUploaderModelValue]
  delete: [item: VroVanImageUploaderItem, index: number]
  error: [error: unknown]
}

export interface VroVanImageUploaderPresetItem {
  /**
   * 预设图片位标题。
   */
  label?: string

  /**
   * 是否必填。
   */
  required?: boolean
}

export const vroVanImageUploaderProps = {
  /**
   * 绑定值，字符串为单图远程地址，数组为多图或本地 File 列表。
   */
  modelValue: {
    type: [String, Object, Array] as PropType<VroVanImageUploaderModelValue>,
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

  /**
   * 文件选择类型。
   *
   * @default 'image/*'
   */
  accept: {
    type: String as PropType<InputHTMLAttributes['accept']>,
    default: 'image/*',
  },

  /**
   * 是否支持多选。
   */
  multiple: Boolean,

  /**
   * 自定义选择资源方法。
   * 如果传递了这个，则隐藏 input file
   * 后续则直接返回上传后的结果
   */
  chooseMedia: Function as PropType<
    (
      params: VroVanImageUploaderChooseMediaParams,
    ) => VroVanImageUploaderResult | Promise<VroVanImageUploaderResult>
  >,

  /**
   * 预设图片位。
   */
  preset: Array as PropType<VroVanImageUploaderPresetItem[]>,
}

export type VroVanImageUploaderProps = ExtractPropTypes<typeof vroVanImageUploaderProps>
