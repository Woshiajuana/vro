import type { ExtractPropTypes, PropType } from 'vue'

import type { VroVanIconProps } from '../vro-van-icon'

export type VroVanCellDirection = 'row' | 'column'

export const vroVanCellProps = {
  /**
   * 左侧标题内容。
   */
  label: String,

  /**
   * 右侧内容。
   */
  value: String,

  /**
   * 内容排列方向。
   *
   * @default row
   */
  direction: {
    type: String as PropType<VroVanCellDirection>,
    default: 'row',
  },

  /**
   * 是否垂直居中。
   */
  alignItemCenter: Boolean,

  /**
   * 是否显示必填星号。
   */
  required: Boolean,

  /**
   * 是否隐藏必填星号，仅在 required 为 true 时生效。
   */
  noAsterisk: Boolean,

  /**
   * 是否显示右侧箭头。
   */
  arrow: Boolean,

  /**
   * 是否展示点击态。
   */
  clickable: Boolean,

  /**
   * 是否单行省略右侧内容。
   */
  ellipsis: Boolean,

  /**
   * 右侧内容最大显示行数，设置后超出内容会省略。
   */
  lineClamp: [String, Number] as PropType<string | number>,

  /**
   * 左侧图标属性，透传给 VroVanIcon。
   */
  iconProps: Object as PropType<Partial<VroVanIconProps>>,

  /**
   * 右侧内容格式化函数。
   */
  formatter: {
    default: (v: any) => v,
    type: Function as PropType<(v: any) => any>,
  },
}

export type VroVanCellProps = ExtractPropTypes<typeof vroVanCellProps>
