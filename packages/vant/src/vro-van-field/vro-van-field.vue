<template>
  <vro-van-cell
    v-bind="cellProps"
    class="vro-van-field"
    :class="{
      'is-disabled': disabled,
      'is-readonly': readonly,
    }"
  >
    <template v-for="name in forwardedCellSlotNames" #[name] :key="name">
      <slot :name="name"></slot>
    </template>

    <template #default>
      <slot>
        <vro-input
          v-bind="inputProps"
          ref="inputRef"
          @update:model-value="$emit('update:modelValue', $event)"
          @input="$emit('input', $event)"
          @blur="$emit('blur', $event)"
        />
        <vro-van-icon
          v-show="showClear"
          class="vro-van-field-clear"
          name="van-icon-clear"
          @click="handleClear"
        />
        <span v-if="unit" class="vro-van-field-unit">{{ unit }}</span>
      </slot>
    </template>
  </vro-van-cell>
</template>

<script setup lang="ts">
  import { pick, typedKeys } from '@daysnap/utils'
  import { VroInput, type VroInputInstance, vroInputProps } from '@vrojs/base'
  import { computed, ref } from 'vue'

  import { VroVanCell } from '../vro-van-cell'
  import { VroVanIcon } from '../vro-van-icon'
  import { vroVanFieldCellProps, vroVanFieldProps } from './types'

  defineOptions({ name: 'VroVanField' })

  const cellSlotNames = ['before', 'prefix', 'icon-default', 'label', 'suffix', 'after'] as const

  const slots = defineSlots<{
    default?: () => any
    before?: () => any
    prefix?: () => any
    'icon-default'?: () => any
    label?: () => any
    suffix?: () => any
    after?: () => any
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void
    (event: 'input', value: InputEvent): void
    (event: 'blur', value: FocusEvent): void
    (event: 'clear'): void
  }>()

  const props = defineProps(vroVanFieldProps)
  const inputRef = ref<VroInputInstance>()

  const cellProps = computed(() => pick(props, typedKeys(vroVanFieldCellProps)))
  const inputProps = computed(() => pick(props, typedKeys(vroInputProps)))
  const forwardedCellSlotNames = computed(() => cellSlotNames.filter((name) => slots[name]))
  const showClear = computed(() => {
    const { clearable, disabled, readonly, modelValue } = props
    return clearable && !disabled && !readonly && modelValue !== '' && modelValue != null
  })

  const handleClear = () => {
    emit('update:modelValue', '')
    emit('clear')
  }

  defineExpose({
    get input() {
      return inputRef.value?.input
    },
  })
</script>
