import type { VroSlot } from '@vrojs/base'
import type { ExtractPropTypes, PropType } from 'vue'

export const vroVanNavbarProps = {
  /**
   * 标题文本。
   */
  title: String,

  /**
   * 左侧文本。
   */
  leftText: String,

  /**
   * 右侧文本。
   */
  rightText: String,

  /**
   * 左侧图标名称。
   *
   * @default 'van-icon-arrow-left'
   */
  leftIcon: {
    type: String,
    default: 'van-icon-arrow-left',
  },

  /**
   * 是否显示左侧箭头。
   *
   * @default true
   */
  leftArrow: {
    type: Boolean,
    default: true,
  },

  /**
   * 是否开启顶部安全区适配。
   */
  safeAreaInsetTop: Boolean,

  /**
   * 是否显示下边框。
   *
   * @default true
   */
  border: {
    type: Boolean,
    default: true,
  },

  /**
   * 是否固定在顶部。
   */
  fixed: Boolean,

  /**
   * 固定在顶部时，是否在标签位置生成等高占位元素。
   */
  placeholder: Boolean,

  /**
   * 固定定位层级。
   *
   * @default 1
   */
  zIndex: {
    type: [Number, String] as PropType<number | string>,
    default: 1,
  },
}

export type VroVanNavbarProps = ExtractPropTypes<typeof vroVanNavbarProps>

export interface VroVanNavbarSlots {
  /**
   * 自定义导航栏主体内容，会覆盖默认标题区域。
   */
  default?: VroSlot

  /**
   * 自定义标题内容。
   */
  title?: VroSlot

  /**
   * 自定义左侧内容。
   */
  left?: VroSlot

  /**
   * 自定义右侧内容。
   */
  right?: VroSlot
}

export interface VroVanNavbarEmits {
  /**
   * 点击左侧区域时触发。
   */
  'click-left': [event: MouseEvent]

  /**
   * 点击右侧区域时触发。
   */
  'click-right': [event: MouseEvent]
}
