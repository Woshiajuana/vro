import type { VroSlot } from '@vrojs/base'
import type { ExtractPropTypes, PropType } from 'vue'

import type { VroVanNavbarProps } from '../vro-van-navbar'

export const vroVanViewProps = {
  /**
   * 导航栏标题文本。
   */
  title: String,

  /**
   * 是否显示默认导航栏。
   *
   * @default true
   */
  showNavbar: {
    type: Boolean,
    default: true,
  },

  /**
   * 透传给 VroVanNavbar 的属性。
   */
  navbarProps: {
    type: Object as PropType<Partial<Omit<VroVanNavbarProps, 'title'>>>,
    default: () => ({}),
  },

  /**
   * 内容区域是否可滚动。
   *
   * @default true
   */
  scrollable: {
    type: Boolean,
    default: true,
  },
}

export type VroVanViewProps = ExtractPropTypes<typeof vroVanViewProps>

export interface VroVanViewSlots {
  /**
   * 页面主要内容。
   */
  default?: VroSlot

  /**
   * 自定义页面头部，会覆盖默认导航栏。
   */
  header?: VroSlot

  /**
   * 自定义导航栏主体内容，会转发给 VroVanNavbar。
   */
  navbar?: VroSlot

  /**
   * 自定义导航栏标题内容，会转发给 VroVanNavbar。
   */
  title?: VroSlot

  /**
   * 自定义导航栏左侧内容，会转发给 VroVanNavbar。
   */
  left?: VroSlot

  /**
   * 自定义导航栏右侧内容，会转发给 VroVanNavbar。
   */
  right?: VroSlot

  /**
   * 页面底部内容。
   */
  footer?: VroSlot
}

export interface VroVanViewEmits {
  /**
   * 点击默认导航栏左侧区域时触发。
   */
  'click-left': [event: MouseEvent]

  /**
   * 点击默认导航栏右侧区域时触发。
   */
  'click-right': [event: MouseEvent]
}
