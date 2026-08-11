import type { ExtractPropTypes, PropType } from 'vue'

export type VroCircleProgressStrokeLinecap = 'butt' | 'round' | 'square'

export const vroCircleProgressProps = {
  /**
   * 当前进度，取值范围为 0 ~ 100。
   */
  modelValue: {
    type: Number,
    default: 0,
  },

  /**
   * 圆环尺寸，传入数字时单位为 px。
   */
  size: {
    type: [Number, String] as PropType<string | number>,
    default: 100,
  },

  /**
   * 进度条宽度。
   */
  strokeWidth: {
    type: [Number, String] as PropType<string | number>,
    default: 10,
  },

  /**
   * 进度条端点样式。
   */
  strokeLinecap: {
    type: String as PropType<VroCircleProgressStrokeLinecap>,
    default: 'round',
  },

  /**
   * 动画时长，传入数字时单位为 ms。
   */
  duration: {
    type: [Number, String] as PropType<string | number>,
    default: 300,
  },

  /**
   * 进度条颜色。
   */
  color: String,

  /**
   * 轨道颜色。
   */
  backgroundColor: String,

  /**
   * 动画速度曲线。
   */
  curve: String,
}

export interface VroCircleProgressSlots {
  default?: (props: { value: number }) => any
}

export type VroCircleProgressProps = ExtractPropTypes<typeof vroCircleProgressProps>
