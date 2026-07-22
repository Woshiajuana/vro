<template>
  <vro-van-cell v-bind="cellProps" class="vro-van-radio">
    <van-radio-group
      v-bind="radioGroupProps"
      class="vro-van-radio-group"
      @update:model-value="$emit('update:modelValue', $event)"
      @change="$emit('change', $event)"
    >
      <van-radio
        v-for="(option, index) in normalizedOptions"
        v-bind="option.props"
        :key="option.key"
        :name="option.value"
        :disabled="disabled || option.disabled"
      >
        <slot
          name="option"
          :index="index"
          :option="option.raw"
          :label="option.label"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </slot>
      </van-radio>
    </van-radio-group>
  </vro-van-cell>
</template>

<script setup lang="ts">
  import { pick, typedKeys } from '@daysnap/utils'
  import { Radio as VanRadio, RadioGroup as VanRadioGroup } from 'vant'
  import { computed } from 'vue'

  import { VroVanCell } from '../vro-van-cell'
  import {
    vroVanRadioCellProps,
    type VroVanRadioEmits,
    vroVanRadioGroupProps,
    type VroVanRadioNormalizedOption,
    type VroVanRadioOption,
    vroVanRadioProps,
    type VroVanRadioSlots,
  } from './types'

  defineOptions({ name: 'VroVanRadio' })
  defineSlots<VroVanRadioSlots>()
  defineEmits<VroVanRadioEmits>()
  const props = defineProps(vroVanRadioProps)

  const cellProps = computed(() => pick(props, typedKeys(vroVanRadioCellProps)))
  const radioGroupProps = computed(() => {
    return {
      ...pick(props, typedKeys(vroVanRadioGroupProps)),
      direction: props.radioDirection,
    }
  })

  const normalizedOptions = computed<VroVanRadioNormalizedOption[]>(() =>
    props.options.map((option: VroVanRadioOption, index) => {
      const isStringOption = typeof option === 'string'
      const value = isStringOption ? option : (option[props.valueKey] ?? index)

      return {
        key: typeof value === 'string' || typeof value === 'number' ? value : index,
        label: isStringOption ? option : (option[props.labelKey] ?? value),
        value,
        disabled: isStringOption ? false : !!option.disabled,
        props: isStringOption ? {} : (option.props ?? {}),
        raw: option,
      }
    }),
  )
</script>
