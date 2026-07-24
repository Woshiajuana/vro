import type { VroLoadingProps, VroSlot } from '@vrojs/base'
import type { ExtractPropTypes, PropType } from 'vue'

export interface VroElSkeletonErrorSlotProps {
  error: unknown
  refresh: () => void
}

export interface VroElSkeletonEmptySlotProps {
  refresh: () => void
}

export interface VroElSkeletonEmits {
  refresh: []
}

export const vroElSkeletonProps = {
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
   * 错误状态标题，未传时使用 locale 中的 skeleton.errorTitle。
   */
  errorTitle: String,

  /**
   * 错误状态按钮文案，未传时使用 locale 中的 skeleton.errorBtnText。
   */
  errorBtnText: String,

  /**
   * 是否显示空状态。
   */
  empty: Boolean,

  /**
   * 空状态描述文案，未传时使用 locale 中的 skeleton.emptyDescription。
   */
  emptyDescription: String,

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

export type VroElSkeletonProps = ExtractPropTypes<typeof vroElSkeletonProps>

export interface VroElSkeletonSlots {
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
  error?: (props: VroElSkeletonErrorSlotProps) => any

  /**
   * 自定义空状态内容。
   */
  empty?: (props: VroElSkeletonEmptySlotProps) => any
}
