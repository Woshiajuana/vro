import type { PickerCancelEventParams, PopupProps } from 'vant'
import type { ExtractPropTypes, PropType } from 'vue'

export const platePreSource = [
  '京',
  '津',
  '沪',
  '渝',
  '冀',
  '晋',
  '陕',
  '鲁',
  '豫',
  '辽',
  '吉',
  '黑',
  '苏',
  '浙',
  '皖',
  '赣',
  '闽',
  '鄂',
  '湘',
  '川',
  '贵',
  '云',
  '粤',
  '琼',
  '甘',
  '青',
  '台',
  '蒙',
  '新',
  '藏',
  '桂',
  '宁',
]

export interface VroVanPlatePickerResult {
  /**
   * 当前选中的车牌前缀。
   */
  value: string
}

export const vroVanPlatePickerProps = {
  /**
   * 当前选中的车牌前缀。
   */
  modelValue: String as PropType<string>,

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
   * VanPopup 属性配置。
   */
  popupProps: Object as PropType<Partial<PopupProps>>,

  /**
   * 是否显示额外选项。
   *
   * @default true
   */
  showExtra: {
    type: Boolean,
    default: true,
  },

  /**
   * 额外选项列表。
   */
  extraKeys: {
    type: Array as PropType<string[]>,
    default: () => ['未上牌', '未知'],
  },
}

export type VroVanPlatePickerProps = ExtractPropTypes<typeof vroVanPlatePickerProps>

export interface VroVanPlatePickerEmits {
  /**
   * 选中值确认时触发。
   */
  'update:modelValue': [value: string]

  /**
   * 点击确认按钮时触发。
   */
  confirm: [params: VroVanPlatePickerResult]

  /**
   * 点击取消按钮或关闭弹层时触发。
   */
  cancel: [params?: PickerCancelEventParams | unknown]

  /**
   * 弹层关闭动画结束时触发。
   */
  closed: []
}
