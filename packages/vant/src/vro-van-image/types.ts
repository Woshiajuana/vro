import type { ExtractPropTypes, PropType } from 'vue'

export type VroVanImageNormalizeSrc = (options: {
  src: string
  ratio?: string | number
  baseUrl?: string
}) => string

export const vroVanImageProps = {
  /**
   * 图片地址。
   */
  src: String,

  /**
   * 替代文本。
   */
  alt: String,

  /**
   * 加载失败占位图。
   */
  placeholder: String,

  /**
   * 加载占位图地址。
   */
  loadingSrc: String,

  /**
   * 图片基础地址，会传入 normalizeSrc 统一处理。
   */
  baseUrl: String,

  /**
   * 图片地址转换比例。
   */
  ratio: [String, Number],

  /**
   * 预览图片地址转换比例，默认使用 ratio。
   */
  previewRatio: [String, Number],

  /**
   * 图片地址转换方法。
   */
  normalizeSrc: Function as PropType<VroVanImageNormalizeSrc>,

  /**
   * 是否开启图片预览。传入字符串或字符串数组时作为预览图片地址。
   *
   * @default false
   */
  preview: {
    type: [String, Boolean, Array] as PropType<string | boolean | string[]>,
    default: false,
  },

  /**
   * 预览起始位置。
   *
   * @default 0
   */
  previewIndex: {
    type: [Number, String],
    default: 0,
  },
}

export type VroVanImageProps = ExtractPropTypes<typeof vroVanImageProps>

export interface VroVanImageEmits {
  /**
   * 图片加载完成时触发。
   */
  load: [event: Event]

  /**
   * 图片加载失败时触发。
   */
  error: [event: Event]
}
