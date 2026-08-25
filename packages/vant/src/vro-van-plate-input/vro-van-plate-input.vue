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

    <span
      v-show="!isExtraValue"
      class="vro-van-plate-input-value"
      :class="{ 'is-placeholder': !suffix }"
    >
      {{ suffix || placeholder || t('plateInput.placeholder') }}
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
  import { computed, ref, watch } from 'vue'

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
  const currentValue = ref(props.modelValue)

  const cellProps = computed(() => pick(props, typedKeys(vroVanPlateInputCellProps)))
  const extraKeys = computed(
    () => props.platePickerProps?.extraKeys ?? vroVanPlatePickerProps.extraKeys.default(),
  )
  const isExtraValue = computed(() => extraKeys.value.includes(currentValue.value))
  const prefix = computed(() => {
    if (isExtraValue.value) {
      return currentValue.value
    }

    return currentValue.value.slice(0, 1)
  })
  const suffix = computed(() => {
    if (isExtraValue.value) {
      return ''
    }

    return currentValue.value.slice(1)
  })
  const showClear = computed(() => {
    const { clearable, disabled, readonly } = props
    return clearable && !disabled && !readonly && !!currentValue.value
  })
  watch(
    () => props.modelValue,
    (value) => {
      currentValue.value = value
    },
  )

  const emitValue = (value: string) => {
    emit('update:modelValue', value)
    emit('change', value)
  }

  const canEmitValue = (value: string) => {
    return !value || extraKeys.value.includes(value) || (!!value.slice(0, 1) && !!value.slice(1))
  }

  const updateValue = (value: string) => {
    currentValue.value = value

    if (canEmitValue(value)) {
      emitValue(value)
    }
  }

  const openPlatePicker = () => {
    showVroVanPlatePicker<VroVanPlatePickerResult>({
      ...props.platePickerProps,
      value: isExtraValue.value ? currentValue.value : prefix.value,
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
      maxlength: props.maxlength,
    })
      .then((result) => {
        updateValue(`${prefix.value}${result.value}`)
      })
      .catch(() => {})
  }

  const handleClick = () => {
    if (props.disabled || props.readonly) {
      return
    }

    if (prefix.value && !isExtraValue.value) {
      openKeyboard()
    } else {
      openPlatePicker()
    }
  }

  const handlePrefixClick = () => {
    if (props.disabled || props.readonly) {
      return
    }

    openPlatePicker()
  }

  const handleClear = () => {
    updateValue('')
    emit('clear')
  }
</script>
