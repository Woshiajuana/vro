import type { VroSlot } from '@vrojs/base'
import type { ExtractPropTypes, PropType } from 'vue'

export type VroVanScrollDone = (error?: string) => void

export interface VroVanScrollEmits {
  /**
   * 下拉刷新时触发，调用 done 结束刷新状态。
   */
  refresh: [done: VroVanScrollDone]

  /**
   * 滚动到底部加载更多时触发，调用 done 结束加载状态。
   */
  load: [done: VroVanScrollDone]
}

export interface VroVanScrollSlots {
  /**
   * 滚动内容。
   */
  default?: VroSlot
}

export const vroVanScrollProps = {
  /**
   * 加载中文案，未传时使用 locale 中的 scroll.loadingText。
   */
  loadingText: String,

  /**
   * 下拉过程文案，未传时使用 locale 中的 scroll.pullingText。
   */
  pullingText: String,

  /**
   * 释放刷新文案，未传时使用 locale 中的 scroll.loosingText。
   */
  loosingText: String,

  /**
   * 刷新成功文案，未传时使用 locale 中的 scroll.successText。
   */
  successText: String,

  /**
   * 刷新成功提示展示时长。
   *
   * @default 1000
   */
  successDuration: {
    type: [String, Number] as PropType<string | number>,
    default: 1000,
  },

  /**
   * 列表加载完成文案，未传时使用 locale 中的 scroll.finishedText。
   */
  finishedText: String,

  /**
   * 是否加载完成。
   */
  finished: Boolean,

  /**
   * 滚动条与底部距离小于 offset 时触发 load。
   *
   * @default 100
   */
  offset: {
    type: [String, Number] as PropType<string | number>,
    default: 100,
  },

  /**
   * 是否禁用下拉刷新。
   */
  refreshDisabled: Boolean,

  /**
   * 是否禁用列表加载。
   */
  loadDisabled: Boolean,

  /**
   * 是否在初始化时立即触发滚动位置检查。
   */
  immediateCheck: Boolean,
}

export type VroVanScrollProps = ExtractPropTypes<typeof vroVanScrollProps>
