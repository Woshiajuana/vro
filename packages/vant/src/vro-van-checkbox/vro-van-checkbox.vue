<template>
  <vro-van-cell v-bind="cellProps" class="vro-van-checkbox">
    <van-checkbox-group
      v-bind="checkboxGroupProps"
      class="vro-van-checkbox-group"
      @update:model-value="$emit('update:modelValue', $event)"
      @change="$emit('change', $event)"
    >
      <van-checkbox
        v-for="(option, index) in options"
        v-bind="getOptionProps(option)"
        :key="getOptionValue(option, index)"
        :name="getOptionValue(option, index)"
        :disabled="disabled || getOptionDisabled(option)"
      >
        <slot name="option" :index="index" :option="option">
          {{ getOptionLabel(option) }}
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

  const getOptionLabel = (option: VroVanCheckboxOption) => {
    return typeof option === 'string' ? option : (option[props.labelKey] ?? option)
  }

  const getOptionValue = (option: VroVanCheckboxOption, index: number) => {
    return typeof option === 'string' ? option : (option[props.valueKey] ?? index)
  }

  const getOptionDisabled = (option: VroVanCheckboxOption) => {
    return typeof option === 'string' ? false : !!option.disabled
  }

  const getOptionProps = (option: VroVanCheckboxOption) => {
    return typeof option === 'string' ? {} : (option.props ?? {})
  }
</script>
