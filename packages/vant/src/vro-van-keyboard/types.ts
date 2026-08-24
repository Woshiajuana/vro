import type { PopupProps } from 'vant'
import type { ExtractPropTypes, PropType } from 'vue'

export interface VroVanKeyboardResult {
  /**
   * 当前输入值。
   */
  value: string
}

export const vroVanKeyboardProps = {
  /**
   * 初始输入值。
   */
  value: String,

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
   * 输入为空时的占位文案。
   */
  placeholder: String,

  /**
   * 最大输入长度。
   */
  maxlength: [Number, String],

  /**
   * 禁用的按键列表。
   */
  disabledKeys: {
    type: Array as PropType<string[]>,
    default: () => [],
  },

  /**
   * VanPopup 属性配置。
   */
  popupProps: Object as PropType<Partial<PopupProps>>,

  /**
   * 点击粘贴按钮时触发，返回值会填入键盘。
   */
  onPaste: Function as PropType<() => string | Promise<string>>,
}

export type VroVanKeyboardProps = ExtractPropTypes<typeof vroVanKeyboardProps>

export interface VroVanKeyboardEmits {
  /**
   * 弹层关闭动画结束时触发。
   */
  closed: []
}
