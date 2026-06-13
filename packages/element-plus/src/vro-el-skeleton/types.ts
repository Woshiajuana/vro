import type { VroLoadingType } from '@vrojs/base'
import type { ExtractPropTypes, PropType } from 'vue'

export const vroElSkeletonProps = {
  /**
   * 是否显示加载状态。
   */
  loading: Boolean,

  /**
   * 错误信息。传入后会显示错误状态。
   */
  error: [Object, String] as PropType<unknown>,

  /**
   * 是否显示空状态。
   */
  empty: Boolean,

  /**
   * 加载状态描述文案，未传时使用 locale 中的 skeleton.loadingDescription。
   */
  loadingDescription: String,

  /**
   * 空状态描述文案，未传时使用 locale 中的 skeleton.emptyDescription。
   */
  emptyDescription: String,

  /**
   * 是否展示空状态刷新按钮
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
   * 错误状态标题，未传时使用 locale 中的 skeleton.errorTitle。
   */
  errorTitle: String,

  /**
   * 错误状态按钮文案，未传时使用 locale 中的 skeleton.errorBtnText。
   */
  errorBtnText: String,

  /**
   * 加载图标类型。
   */
  loadingType: {
    type: String as PropType<VroLoadingType>,
    default: 'circular',
  },

  /**
   * 加载图标尺寸，传入数字时单位为 px。
   */
  loadingSize: {
    type: [String, Number] as PropType<string | number>,
    default: 32,
  },

  /**
   * 加载图标颜色。
   */
  loadingColor: {
    type: String,
    default: 'currentColor',
  },

  /**
   * 状态容器最小高度，传入数字时单位为 px。
   */
  minHeight: {
    type: [String, Number] as PropType<string | number>,
    default: '240px',
  },
}

export type VroElSkeletonProps = ExtractPropTypes<typeof vroElSkeletonProps>
