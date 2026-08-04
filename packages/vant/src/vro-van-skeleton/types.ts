import type { VroLoadingProps, VroSlot } from '@vrojs/base'
import type { EmptyProps } from 'vant'
import type { ExtractPropTypes, PropType } from 'vue'

export interface VroVanSkeletonErrorSlotProps {
  error: unknown
  refresh: () => void
}

export interface VroVanSkeletonEmptySlotProps {
  refresh: () => void
}

export interface VroVanSkeletonEmits {
  /**
   * 点击刷新按钮时触发。
   */
  refresh: []

  /**
   * 点击错误状态刷新按钮时触发。
   */
  'update:error': [value: unknown]
}

export const vroVanSkeletonProps = {
  /**
   * 是否显示加载状态。
   */
  loading: Boolean,

  /**
   * 加载图标属性。
   */
  loadingProps: Object as PropType<Partial<VroLoadingProps>>,

  /**
   * 加载状态描述文案，未传时使用 locale 中的 skeleton.loadingDescription。
   */
  loadingDescription: String,

  /**
   * 错误信息。传入后会显示错误状态。
   */
  error: [Object, String] as PropType<unknown>,

  /**
   * 错误状态描述格式化函数。
   */
  formatter: Function as PropType<(err: unknown) => string>,

  /**
   * 错误状态按钮文案，未传时使用 locale 中的 skeleton.errorBtnText。
   */
  errorBtnText: String,

  /**
   * 是否显示空状态。
   */
  empty: {
    type: Boolean,
    default: true,
  },

  /**
   * 空状态描述文案，未传时使用 locale 中的 skeleton.emptyDescription。
   */
  emptyDescription: String,

  /**
   * 空状态图片。
   */
  emptyImage: String as PropType<EmptyProps['image']>,

  /**
   * 空状态图片尺寸。
   */
  emptyImageSize: [Number, String, Array] as PropType<EmptyProps['imageSize']>,

  /**
   * 是否展示空状态刷新按钮。
   */
  showEmptyBtn: {
    type: Boolean,
    default: true,
  },

  /**
   * 空状态按钮文案，未传时使用 locale 中的 skeleton.emptyBtnText。
   */
  emptyBtnText: String,

  /**
   * 状态容器最小高度，传入数字时单位为 px。
   */
  minHeight: [String, Number] as PropType<string | number>,
}

export type VroVanSkeletonProps = ExtractPropTypes<typeof vroVanSkeletonProps>

export interface VroVanSkeletonSlots {
  /**
   * 正常内容。
   */
  default?: VroSlot

  /**
   * 自定义加载状态内容。
   */
  loading?: VroSlot

  /**
   * 自定义错误状态内容。
   */
  error?: (props: VroVanSkeletonErrorSlotProps) => any

  /**
   * 自定义空状态内容。
   */
  empty?: (props: VroVanSkeletonEmptySlotProps) => any
}
