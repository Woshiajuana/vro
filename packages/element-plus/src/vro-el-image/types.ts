import type { VroSlot } from '@vrojs/base'
import { imageProps } from 'element-plus'
import type { ExtractPropTypes, PropType } from 'vue'

export type VroElImageNormalizeSrc = (options: {
  src: string
  ratio?: string | number
  baseUrl?: string
}) => string

export const vroElImageProps = {
  ...imageProps,

  /**
   * 图片预览是否插入到 body。
   */
  previewTeleported: {
    type: Boolean,
    default: true,
  },

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
  normalizeSrc: Function as PropType<VroElImageNormalizeSrc>,
}

export type VroElImageProps = ExtractPropTypes<typeof vroElImageProps>

export interface VroElImageSlots {
  /**
   * 自定义图片加载中占位内容。
   */
  placeholder?: VroSlot

  /**
   * 自定义图片加载失败内容。
   */
  error?: VroSlot

  /**
   * 自定义图片预览内容。
   */
  viewer?: VroSlot

  /**
   * 自定义预览进度内容。
   */
  progress?: VroSlot

  /**
   * 自定义预览工具栏内容。
   */
  toolbar?: VroSlot

  /**
   * 自定义预览加载失败内容。
   */
  'viewer-error'?: VroSlot
}
