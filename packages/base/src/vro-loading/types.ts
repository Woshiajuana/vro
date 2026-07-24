import type { ExtractPropTypes, PropType } from 'vue'

export type VroLoadingType = 'circular' | 'spinner' | 'dots' | 'image'

export const vroLoadingProps = {
  /**
   * 加载图标类型。
   */
  type: {
    type: String as PropType<VroLoadingType>,
    default: 'circular',
  },

  /**
   * 加载图标尺寸，传入数字时单位为 px。
   */
  size: [String, Number] as PropType<string | number>,

  /**
   * 加载图标颜色。
   */
  color: String,

  /**
   * 加载动画时长，传入数字时单位为 ms。
   */
  duration: [String, Number] as PropType<string | number>,

  /**
   * 无障碍标签。
   */
  ariaLabel: {
    type: String,
    default: '加载中',
  },
}

export type VroLoadingProps = ExtractPropTypes<typeof vroLoadingProps>
