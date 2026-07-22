<template>
  <vro-van-cell
    v-bind="cellProps"
    class="vro-van-radio-button"
    :style="{ '--vro-van-radio-button-columns': columns || undefined }"
  >
    <button
      v-for="(option, index) in normalizedOptions"
      v-bind="option.props"
      :key="option.key"
      class="vro-van-radio-button-item"
      :class="{ 'is-checked': option.checked }"
      type="button"
      :aria-pressed="option.checked"
      :disabled="disabled || option.disabled"
      @click="selectOption(option)"
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
    type VroVanRadioButtonEmits,
    type VroVanRadioButtonNormalizedOption,
    type VroVanRadioButtonOption,
    vroVanRadioButtonCellProps,
    vroVanRadioButtonProps,
    type VroVanRadioButtonSlots,
  } from './types'

  defineOptions({ name: 'VroVanRadioButton' })
  defineSlots<VroVanRadioButtonSlots>()
  const emit = defineEmits<VroVanRadioButtonEmits>()
  const props = defineProps(vroVanRadioButtonProps)

  const cellProps = computed(() => pick(props, typedKeys(vroVanRadioButtonCellProps)))
  const normalizedOptions = computed<VroVanRadioButtonNormalizedOption[]>(() =>
    props.options.map((option: VroVanRadioButtonOption, index) => {
      const isStringOption = typeof option === 'string'
      const value = isStringOption ? option : (option[props.valueKey] ?? index)

      return {
        key: typeof value === 'string' || typeof value === 'number' ? value : index,
        label: isStringOption ? option : (option[props.labelKey] ?? value),
        value,
        disabled: isStringOption ? false : !!option.disabled,
        checked: props.modelValue === value,
        props: isStringOption ? {} : (option.props ?? {}),
        raw: option,
      }
    }),
  )

  const selectOption = (option: VroVanRadioButtonNormalizedOption) => {
    if (option.checked) {
      return
    }

    emit('update:modelValue', option.value)
    emit('change', option.value)
  }
</script>
