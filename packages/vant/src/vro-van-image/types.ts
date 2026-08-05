import type { ExtractPropTypes, PropType } from 'vue'

export type VroVanImageNormalizeSrc = (options: {
  src: string
  ratio?: string | number
  baseUrl?: string
}) => string

export const vroVanImageProps = {
  src: String,

  alt: String,

  // 加载失败占位图
  placeholder: String,

  // loading 图 // 默认使用 img-loading.gif
  loading: String,

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

  // 图片地址转换方法。
  normalizeSrc: Function as PropType<VroVanImageNormalizeSrc>,

  preview: {
    type: [String, Boolean, Array] as PropType<string | boolean | string[]>,
    default: false,
  },
  previewIndex: {
    type: [Number, String],
    default: 0,
  },
}

export type VroVanImageProps = ExtractPropTypes<typeof vroVanImageProps>
