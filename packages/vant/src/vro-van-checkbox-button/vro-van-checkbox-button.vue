<template>
  <vro-van-cell
    v-bind="cellProps"
    class="vro-van-checkbox-button"
    :style="{ '--vro-van-checkbox-button-columns': columns || undefined }"
  >
    <button
      v-for="(option, index) in normalizedOptions"
      v-bind="option.props"
      :key="option.key"
      class="vro-van-checkbox-button-item"
      :class="{ 'is-checked': option.checked }"
      type="button"
      :aria-pressed="option.checked"
      :disabled="disabled || option.disabled || (!option.checked && isMaxReached)"
      @click="toggleOption(option)"
    >
      <slot
        name="option"
        :index="index"
        :option="option.raw"
        :label="option.label"
        :value="option.value"
        :disabled="option.disabled"
        :checked="option.checked"
      >
        {{ option.label }}
      </slot>
    </button>
  </vro-van-cell>
</template>

<script setup lang="ts">
  import { pick, typedKeys } from '@daysnap/utils'
  import { computed } from 'vue'

  import { VroVanCell } from '../vro-van-cell'
  import {
    vroVanCheckboxButtonCellProps,
    type VroVanCheckboxButtonEmits,
    type VroVanCheckboxButtonNormalizedOption,
    type VroVanCheckboxButtonOption,
    vroVanCheckboxButtonProps,
    type VroVanCheckboxButtonSlots,
  } from './types'

  defineOptions({ name: 'VroVanCheckboxButton' })
  defineSlots<VroVanCheckboxButtonSlots>()
  const emit = defineEmits<VroVanCheckboxButtonEmits>()
  const props = defineProps(vroVanCheckboxButtonProps)

  const cellProps = computed(() => pick(props, typedKeys(vroVanCheckboxButtonCellProps)))
  const isMaxReached = computed(() => !!props.max && props.modelValue.length >= props.max)
  const normalizedOptions = computed<VroVanCheckboxButtonNormalizedOption[]>(() =>
    props.options.map((option: VroVanCheckboxButtonOption, index) => {
      const isStringOption = typeof option === 'string'
      const value = isStringOption ? option : (option[props.valueKey] ?? index)

      return {
        key: typeof value === 'string' || typeof value === 'number' ? value : index,
        label: isStringOption ? option : (option[props.labelKey] ?? value),
        value,
        disabled: isStringOption ? false : !!option.disabled,
        checked: props.modelValue.includes(value),
        props: isStringOption ? {} : (option.props ?? {}),
        raw: option,
      }
    }),
  )

  const toggleOption = (option: VroVanCheckboxButtonNormalizedOption) => {
    const value = option.checked
      ? props.modelValue.filter((item) => item !== option.value)
      : [...props.modelValue, option.value]

    emit('update:modelValue', value)
    emit('change', value)
  }
</script>
