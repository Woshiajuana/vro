<template>
  <vro-van-cell
    v-bind="cellProps"
    class="vro-van-plate-input"
    :class="{
      'is-disabled': disabled,
      'is-readonly': readonly,
    }"
    :arrow="false"
    :clickable="clickable && !disabled && !readonly"
    @click="handleClick"
  >
    <template v-for="(_, name) in slots" #[name]="slotProps" :key="name">
      <slot :name="name" v-bind="slotProps"></slot>
    </template>

    <button class="vro-van-plate-input-prefix" type="button" @click.stop="handlePrefixClick">
      {{ prefix }}
    </button>

    <span class="vro-van-plate-input-value" :class="{ 'is-placeholder': !displayValue }">
      {{ displayValue || placeholder || t('plateInput.placeholder') }}
    </span>

    <vro-van-icon
      v-show="showClear"
      class="vro-van-plate-input-clear"
      name="van-icon-clear"
      @click.stop="handleClear"
    />
  </vro-van-cell>
</template>

<script setup lang="ts">
  import { pick, typedKeys } from '@daysnap/utils'
  import { computed } from 'vue'

  import { useLocale } from '../locale'
  import { VroVanCell } from '../vro-van-cell'
  import { VroVanIcon } from '../vro-van-icon'
  import { showVroVanKeyboard } from '../vro-van-keyboard'
  import {
    showVroVanPlatePicker,
    vroVanPlatePickerProps,
    type VroVanPlatePickerResult,
  } from '../vro-van-plate-picker'
  import {
    vroVanPlateInputCellProps,
    type VroVanPlateInputEmits,
    vroVanPlateInputProps,
    type VroVanPlateInputSlots,
  } from './types'

  defineOptions({ name: 'VroVanPlateInput' })

  const slots = defineSlots<VroVanPlateInputSlots>()
  const emit = defineEmits<VroVanPlateInputEmits>()
  const props = defineProps(vroVanPlateInputProps)

  const { t } = useLocale()

  const cellProps = computed(() => pick(props, typedKeys(vroVanPlateInputCellProps)))
  const extraKeys = computed(
    () => props.platePickerProps?.extraKeys ?? vroVanPlatePickerProps.extraKeys.default(),
  )
  const isExtraValue = computed(() => extraKeys.value.includes(props.modelValue))
  const prefix = computed(() => {
    if (isExtraValue.value) {
      return ''
    }

    return props.modelValue.slice(0, 1)
  })
  const suffix = computed(() => {
    if (isExtraValue.value) {
      return ''
    }

    return props.modelValue.slice(1)
  })
  const displayValue = computed(() => {
    const value = isExtraValue.value ? props.modelValue : suffix.value
    return value ? (props.formatter?.(value) ?? value) : ''
  })
  const showClear = computed(() => {
    const { clearable, disabled, readonly, modelValue } = props
    return clearable && !disabled && !readonly && !!modelValue
  })
  const suffixMaxlength = computed(() => {
    const value = Math.floor(Number(props.maxlength))

    if (!Number.isFinite(value)) {
      return undefined
    }

    return Math.max(value - prefix.value.length, 0)
  })

  const updateValue = (value: string) => {
    emit('update:modelValue', value)
    emit('change', value)
  }

  const openPlatePicker = () => {
    showVroVanPlatePicker<VroVanPlatePickerResult>({
      ...props.platePickerProps,
      value: isExtraValue.value ? props.modelValue : prefix.value,
    })
      .then((result) => {
        updateValue(result.type === 'extra' ? result.value : `${result.value}${suffix.value}`)
      })
      .catch(() => {})
  }

  const openKeyboard = () => {
    showVroVanKeyboard({
      ...props.keyboardProps,
      value: suffix.value,
      maxlength: suffixMaxlength.value,
    })
      .then((result) => {
        updateValue(`${prefix.value}${result.value}`)
      })
      .catch(() => {})
  }

  const handleClick = (event: MouseEvent) => {
    if (props.disabled || props.readonly) {
      return
    }

    emit('click', event)

    if (prefix.value) {
      openKeyboard()
    } else {
      openPlatePicker()
    }
  }

  const handlePrefixClick = (event: MouseEvent) => {
    if (props.disabled || props.readonly) {
      return
    }

    emit('click-prefix', event)
    openPlatePicker()
  }

  const handleClear = () => {
    updateValue('')
    emit('clear')
  }
</script>
