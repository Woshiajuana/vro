import type { ExtractPropTypes, PropType } from 'vue'

export const vroCircleProgressProps = {
  // 0 ~ 100
  modelValue: Number,

  // 进度条的宽度
  strokeWidth: {
    type: Number,
    default: 10,
  },

  strokeLinecap: {
    type: String as PropType<'square' | 'round'>,
    default: 'square',
  },

  // 时间
  duration: {
    type: Number,
    default: 3,
  },

  // 颜色
  color: String,

  // 背景颜色
  backgroundColor: String,

  // 速度曲线
  curve: String,

  // 大小
  size: {
    type: [Number, String] as PropType<string | number>,
    default: 100,
  },
}

export type VroCircleProgressProps = ExtractPropTypes<typeof vroCircleProgressProps>
