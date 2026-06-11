import type { ExtractPropTypes, HTMLAttributes, InputTypeHTMLAttribute } from 'vue'

import { definePropType } from '../utils'

export const vroInputProps = {
  /**
   * 输入框类型。
   *
   * 在原生 input type 的基础上扩展了 decimal：
   * - number：只允许输入数字，移动端使用数字键盘
   * - decimal：只允许输入小数，移动端使用小数键盘
   *
   * @default text
   */
  type: {
    type: definePropType<InputTypeHTMLAttribute | 'decimal'>(String),
    default: 'text',
  },

  /**
   * 输入框绑定值。
   */
  modelValue: {
    type: definePropType<string | number | null | undefined>([String, Number]),
    default: '',
  },

  /**
   * 最大值，仅当 type 为 decimal 时作为输入值上限使用。
   *
   * @default Number.MAX_SAFE_INTEGER
   */
  max: {
    type: [String, Number],
    default: Number.MAX_SAFE_INTEGER,
  },

  /**
   * 最小值，仅当 type 为 decimal 时作为输入值下限使用。
   *
   * @default Number.MIN_SAFE_INTEGER
   */
  min: {
    type: [String, Number],
    default: Number.MIN_SAFE_INTEGER,
  },

  /**
   * 输入值超出 min/max 后是否自动修正到边界值，仅当 type 为 decimal 时有效。
   *
   * 为 false 时，超出边界会回退到上一次合法值。
   *
   * @default false
   */
  autoFix: Boolean,

  /**
   * 原生 maxlength 属性。
   */
  maxlength: [String, Number],

  /**
   * 原生 placeholder 属性。
   */
  placeholder: String,

  /**
   * 原生 disabled 属性。
   */
  disabled: Boolean,

  /**
   * 小数精度，仅当 type 为 decimal 时有效。
   *
   * @default 2
   */
  precision: {
    type: [String, Number],
    default: 2,
  },

  /**
   * 输入值格式化函数，在内置 number/decimal 处理之后执行。
   *
   * value 为当前输入值，preValue 为上一次 modelValue。
   */
  formatter: definePropType<(value: string, preValue: string) => string>(Function),

  /**
   * 原生 id 属性。未传入时会自动生成一个 id。
   */
  id: String,

  /**
   * 原生 name 属性。
   */
  name: String,

  /**
   * 原生 readonly 属性。
   */
  readonly: Boolean,

  /**
   * 原生 inputmode 属性。
   *
   * 当 type 为 number 或 decimal 时，组件会自动设置更适合移动端的键盘类型。
   */
  inputmode: definePropType<HTMLAttributes['inputmode']>(String),
}

export type VroInputProps = ExtractPropTypes<typeof vroInputProps>
