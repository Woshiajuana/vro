import type { ExtractPropTypes, PropType } from 'vue'

export const vroVanSkeletonProps = {
  formatter: Function as PropType<(err: unknown) => string>,
  error: {
    type: null as unknown as PropType<unknown>,
    default: '',
  },
  errorBtnText: {
    type: String,
    default: '刷新一下',
  },
  loading: {
    type: Boolean,
    default: true,
  },
  loadingDescription: {
    type: String,
    default: '',
  },
  emptyDescription: {
    type: String,
    default: '暂无数据',
  },
  emptyBtnText: {
    type: String,
    default: '刷新一下',
  },
  minHeight: {
    type: String,
    default: '70vh',
  },
}

export type VroVanSkeletonProps = ExtractPropTypes<typeof vroVanSkeletonProps>
