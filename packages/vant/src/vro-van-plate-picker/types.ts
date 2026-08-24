import type { PopupProps } from 'vant'
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

export type VroVanPlatePickerValueType = 'plate' | 'extra'

export interface VroVanPlatePickerResult {
  /**
   * 当前选中的车牌前缀或额外选项。
   */
  value: string

  /**
   * 当前选中值的来源类型。
   */
  type: VroVanPlatePickerValueType
}

export const vroVanPlatePickerProps = {
  /**
   * 初始选中的车牌前缀或额外选项。
   */
  value: String as PropType<string>,

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
   * 弹层关闭动画结束时触发。
   */
  closed: []
}
