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

export const vroVanPlatePickerProps = {
  modelValue: String,
  showExtra: Boolean,
  extraKeys: {
    type: Array as PropType<string[]>,
    default: () => ['未上牌', '未知'],
  },
}

export type VroVanPlatePickerProps = ExtractPropTypes<typeof vroVanPlatePickerProps>
