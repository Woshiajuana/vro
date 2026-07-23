import type {
  PickerCancelEventParams,
  PickerChangeEventParams,
  PickerConfirmEventParams,
  PickerOption,
  PopupProps,
} from 'vant'
import { pickerProps } from 'vant'
import type { ExtractPropTypes, PropType } from 'vue'

export const VRO_VAN_PICKER_NO_DATA_VALUE = 'VRO-VAN-ERR_NO_DATA'

export interface VroVanPickerResult extends PickerConfirmEventParams {
  value: unknown
}

export const vroVanPickerProps = {
  ...pickerProps,

  /**
   * VanPopup 属性配置。
   */
  popupProps: Object as PropType<Partial<PopupProps>>,

  /**
   * 是否显示筛选输入框。
   */
  filterable: Boolean,

  /**
   * 筛选输入框占位文案。
   */
  filterPlaceholder: String,
}

export type VroVanPickerProps = ExtractPropTypes<typeof vroVanPickerProps>

export interface VroVanPickerEmits {
  /**
   * 选中值变化时触发。
   */
  'update:modelValue': [value: unknown[]]

  /**
   * 点击确认按钮时触发。
   */
  confirm: [params: VroVanPickerResult]

  /**
   * 点击取消按钮或关闭弹层时触发。
   */
  cancel: [params?: PickerCancelEventParams | unknown]

  /**
   * 选项改变时触发。
   */
  change: [params: PickerChangeEventParams]

  /**
   * 点击选项时触发。
   */
  clickOption: [option: PickerOption]

  /**
   * 选项滚动到可视区域时触发。
   */
  scrollInto: [option: PickerOption]
}
