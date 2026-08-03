import type {
  PickerCancelEventParams,
  PickerChangeEventParams,
  PickerConfirmEventParams,
  PopupProps,
} from 'vant'
import { pickerProps } from 'vant'
import type { ExtractPropTypes, PropType } from 'vue'

export type VroVanDateTimePickerColumnType = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'

export interface VroVanDateTimePickerResult extends PickerConfirmEventParams {
  value: string
  date: Date
}

export const vroVanDateTimePickerProps = {
  ...pickerProps,

  /**
   * 当前选中值。
   */
  modelValue: [String, Number, Date] as PropType<string | number | Date>,

  /**
   * 最小可选日期时间。
   */
  min: Date as PropType<Date>,

  /**
   * 最大可选日期时间。
   */
  max: Date as PropType<Date>,

  /**
   * 输出格式，包含的字段会决定展示的列。
   *
   * @default 'yyyy-MM-dd hh:mm:ss'
   */
  format: {
    type: String,
    default: 'yyyy-MM-dd hh:mm:ss',
  },

  /**
   * VanPopup 属性配置。
   */
  popupProps: Object as PropType<Partial<PopupProps>>,
}

export type VroVanDateTimePickerProps = ExtractPropTypes<typeof vroVanDateTimePickerProps>

export interface VroVanDateTimePickerSlots {
  /**
   * 自定义标题左侧内容。
   */
  toolbar?: () => any

  /**
   * 自定义确认按钮内容。
   */
  confirm?: () => any

  /**
   * 自定义取消按钮内容。
   */
  cancel?: () => any

  /**
   * 自定义选项上方内容。
   */
  option?: (scope: { option: unknown }) => any
}

export interface VroVanDateTimePickerEmits {
  /**
   * 选中值变化时触发。
   */
  'update:modelValue': [value: string]

  /**
   * 点击确认按钮时触发。
   */
  confirm: [params: VroVanDateTimePickerResult]

  /**
   * 点击取消按钮或关闭弹层时触发。
   */
  cancel: [params?: PickerCancelEventParams | unknown]

  /**
   * 选项改变时触发。
   */
  change: [params: PickerChangeEventParams]

  /**
   * 弹层关闭动画结束时触发。
   */
  closed: []
}
