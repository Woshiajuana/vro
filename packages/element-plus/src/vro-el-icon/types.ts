import { vroIconProps } from '@vrojs/base'
import type { Component, ExtractPropTypes, PropType, Raw } from 'vue'

export type VroElIconName = string | Raw<Component>

export const vroElIconProps = {
  ...vroIconProps,

  /**
   * 图标名称或组件。
   *
   * - 传入 Element Plus 图标组件对象时，按组件渲染
   * - 传入大写开头的字符串时，按已注册组件名渲染
   * - 传入普通字符串时，按 VroIcon 的字体图标或图片图标渲染
   */
  name: {
    type: [String, Object] as PropType<VroElIconName>,
    default: '',
  },
}

export type VroElIconProps = ExtractPropTypes<typeof vroElIconProps>
