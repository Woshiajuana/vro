import type { PickerCancelEventParams, PickerConfirmEventParams, PopupProps } from 'vant'
import { pickerProps } from 'vant'
import type { ExtractPropTypes, PropType } from 'vue'

export const VRO_VAN_PICKER_NO_DATA_VALUE = 'VRO-VAN-ERR_NO_DATA'

export interface VroVanPickerResult extends PickerConfirmEventParams {
  value: unknown
}

export const vroVanPickerProps = {
  ...pickerProps,

  /**
   * 当前选中值。单列可传单个值，多列或级联传数组。
   */
  modelValue: [Array, String, Number, Boolean, Object] as PropType<unknown | unknown[]>,

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
   * 点击确认按钮时触发。
   */
  confirm: [params: VroVanPickerResult]

  /**
   * 点击取消按钮或关闭弹层时触发。
   */
  cancel: [params?: PickerCancelEventParams | unknown]

  /**
   * 弹层关闭动画结束时触发。
   */
  closed: []
}
