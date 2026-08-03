import type { ActionSheetAction } from 'vant'
import { actionSheetProps } from 'vant'
import type { ExtractPropTypes } from 'vue'

export interface VroVanActionSheetResult {
  action: ActionSheetAction
  index: number
}

export const vroVanActionSheetProps = {
  ...actionSheetProps,
}

export type VroVanActionSheetProps = ExtractPropTypes<typeof vroVanActionSheetProps>

export interface VroVanActionSheetSlots {
  /**
   * 自定义面板内容。
   */
  default?: () => any

  /**
   * 自定义描述内容。
   */
  description?: () => any

  /**
   * 自定义取消按钮内容。
   */
  cancel?: () => any

  /**
   * 自定义选项内容。
   */
  action?: (scope: { action: ActionSheetAction; index: number }) => any
}

export interface VroVanActionSheetEmits {
  /**
   * 显示状态变化时触发。
   */
  'update:show': [value: boolean]

  /**
   * 选择选项时触发。
   */
  select: [action: ActionSheetAction, index: number]

  /**
   * 点击取消、关闭图标或遮罩关闭时触发。
   */
  cancel: [reason?: unknown]

  /**
   * 弹层关闭动画结束时触发。
   */
  closed: []
}
