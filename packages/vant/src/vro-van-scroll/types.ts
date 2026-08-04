import type { ExtractPropTypes, PropType } from 'vue'

export const vroVanScrollProps = {
  loadingText: {
    type: String,
    default: '加载中，请稍后...',
  },
  pullingText: {
    type: String,
    default: '↓ 下拉即可刷新',
  },
  loosingText: {
    type: String,
    default: '↑ 释放即可刷新',
  },
  successText: {
    type: String,
    default: '刷新成功',
  },
  successDuration: {
    type: [String, Number],
    default: 1000,
  },
  finishedText: {
    type: String,
    default: '没有更多了',
  },
  finished: Boolean,
  offset: {
    type: [String, Number],
    default: 100,
  },
  load: Function as PropType<() => any>,
  refresh: Function as PropType<() => any>,
}

export type VroVanScrollProps = ExtractPropTypes<typeof vroVanScrollProps>
