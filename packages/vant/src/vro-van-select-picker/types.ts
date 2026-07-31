import { omit } from '@daysnap/utils'
import type { PickerColumn } from 'vant'
import type { ExtractPropTypes, PropType } from 'vue'

import { vroVanPickerProps } from '../vro-van-picker'
import { vroVanTriggerCellProps } from '../vro-van-trigger-cell'

export const vroVanSelectPickerPickerProps = omit(vroVanPickerProps, ['modelValue', 'columns'])

export const vroVanSelectPickerProps = {
  ...vroVanTriggerCellProps,

  ...vroVanSelectPickerPickerProps,

  trigger: String as PropType<'immediately' | 'lazy'>,

  options: {
    type: [Array, Function] as PropType<
      PickerColumn | (() => Promise<PickerColumn> | PickerColumn)
    >,
    default: () => [],
  },
}

export type VroVanSelectPickerProps = ExtractPropTypes<typeof vroVanSelectPickerProps>
