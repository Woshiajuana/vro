import type { ExtractPropTypes, PropType } from 'vue'

export type VroLoadingType = 'circular' | 'spinner' | 'dots'

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
  size: {
    type: [String, Number] as PropType<string | number>,
    default: 32,
  },

  /**
   * 加载图标颜色。
   */
  color: {
    type: String,
    default: 'currentColor',
  },

  /**
   * 加载文案。
   */
  text: String,

  /**
   * 加载文案颜色，默认跟随图标颜色。
   */
  textColor: String,

  /**
   * 加载文案字号，传入数字时单位为 px。
   */
  textSize: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },

  /**
   * 是否垂直排列图标和文案。
   */
  vertical: Boolean,

  /**
   * 无障碍标签。
   */
  ariaLabel: {
    type: String,
    default: '加载中',
  },
}

export type VroLoadingProps = ExtractPropTypes<typeof vroLoadingProps>
