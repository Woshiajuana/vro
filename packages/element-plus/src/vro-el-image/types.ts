import type { VroLoadingProps, VroSlot } from '@vrojs/base'
import { imageProps } from 'element-plus'
import type { ExtractPropTypes, PropType } from 'vue'

import type { VroElIconProps } from '../vro-el-icon'

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

  /**
   * 默认加载占位图标属性。
   */
  loadingProps: Object as PropType<Partial<VroLoadingProps>>,

  /**
   * 默认加载失败图标属性。
   */
  iconProps: Object as PropType<Partial<VroElIconProps>>,
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
}
