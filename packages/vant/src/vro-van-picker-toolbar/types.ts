import type { VroSlot } from '@vrojs/base'
import type { ExtractPropTypes } from 'vue'

export const vroVanPickerToolbarProps = {
  /**
   * 标题文案。
   */
  title: String,

  /**
   * 取消按钮文案。
   */
  cancelText: String,

  /**
   * 确认按钮文案。
   */
  confirmText: String,

  /**
   * 是否显示取消按钮。
   *
   * @default true
   */
  showCancelButton: {
    type: Boolean,
    default: true,
  },

  /**
   * 是否显示确认按钮。
   *
   * @default true
   */
  showConfirmButton: {
    type: Boolean,
    default: true,
  },
}

export type VroVanPickerToolbarProps = ExtractPropTypes<typeof vroVanPickerToolbarProps>

export interface VroVanPickerToolbarSlots {
  /**
   * 自定义取消按钮内容。
   */
  cancel?: VroSlot

  /**
   * 自定义标题内容。
   */
  title?: VroSlot

  /**
   * 自定义确认按钮内容。
   */
  confirm?: VroSlot
}

export interface VroVanPickerToolbarEmits {
  /**
   * 点击取消按钮时触发。
   */
  cancel: []

  /**
   * 点击确认按钮时触发。
   */
  confirm: []
}
