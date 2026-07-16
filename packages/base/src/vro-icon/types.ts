import type { ExtractPropTypes, PropType } from 'vue'

export const vroIconProps = {
  /**
   * 图标名称。传入图片地址时会渲染为 img，否则作为字体图标类名使用。
   */
  name: String,

  /**
   * 字体图标族类名，仅在 name 不是图片地址时生效。
   *
   * @default iconfont
   */
  fontFamily: {
    type: String,
    default: 'iconfont',
  },

  /**
   * 图标尺寸，传入数字时单位为 px。
   */
  size: [String, Number] as PropType<string | number>,

  /**
   * 图标颜色。
   */
  color: String,

  /**
   * 是否开启旋转动画，传入字符串时作为动画时长。
   */
  loading: [Boolean, String] as PropType<boolean | string>,
}

export type VroIconProps = ExtractPropTypes<typeof vroIconProps>
