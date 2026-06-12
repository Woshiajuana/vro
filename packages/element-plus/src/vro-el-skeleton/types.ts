import type { ExtractPropTypes, PropType } from 'vue'

export const vroElSkeletonProps = {
  loading: Boolean,
  error: Object as PropType<any>,
}

export type VroElSkeletonProps = ExtractPropTypes<typeof vroElSkeletonProps>
