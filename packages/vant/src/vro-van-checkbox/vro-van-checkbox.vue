<template>
  <vro-van-cell v-bind="cellProps" class="vro-van-checkbox">
    <van-checkbox-group
      v-bind="checkboxGroupProps"
      class="vro-van-checkbox-group"
      @update:model-value="$emit('update:modelValue', $event)"
      @change="$emit('change', $event)"
    >
      <van-checkbox
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
      </van-checkbox>
    </van-checkbox-group>
  </vro-van-cell>
</template>

<script setup lang="ts">
  import { pick, typedKeys } from '@daysnap/utils'
  import { Checkbox as VanCheckbox, CheckboxGroup as VanCheckboxGroup } from 'vant'
  import { computed } from 'vue'

  import { VroVanCell } from '../vro-van-cell'
  import {
    vroVanCheckboxCellProps,
    type VroVanCheckboxEmits,
    vroVanCheckboxGroupProps,
    type VroVanCheckboxNormalizedOption,
    type VroVanCheckboxOption,
    vroVanCheckboxProps,
    type VroVanCheckboxSlots,
  } from './types'

  defineOptions({ name: 'VroVanCheckbox' })
  defineSlots<VroVanCheckboxSlots>()
  defineEmits<VroVanCheckboxEmits>()
  const props = defineProps(vroVanCheckboxProps)

  const cellProps = computed(() => pick(props, typedKeys(vroVanCheckboxCellProps)))
  const checkboxGroupProps = computed(() => {
    return {
      ...pick(props, typedKeys(vroVanCheckboxGroupProps)),
      direction: props.checkboxDirection,
    }
  })

  const normalizedOptions = computed<VroVanCheckboxNormalizedOption[]>(() =>
    props.options.map((option: VroVanCheckboxOption, index) => {
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
