<template>
  <input
    v-bind="dynamicProps"
    :value="modelValue"
    @compositionstart="handleCompositionstart"
    @compositionend="handleCompositionend"
    @input="handleInput"
    @focus="$emit('focus', $event)"
    @blur="handleBlur"
  />
</template>

<script setup lang="ts">
  import { isNumber, omit } from '@daysnap/utils'
  import { computed } from 'vue'

  import { useComposition, useId } from '../hooks'
  import { createDecimalPattern, parseDecimalString, parseNumberString } from '../utils'
  import { vroInputProps } from './types'

  defineOptions({ name: 'VroInput' })
  const props = defineProps(vroInputProps)
  const emit = defineEmits(['update:model-value', 'change', 'focus', 'blur'])

  const dynamicProps = computed(() => {
    // eslint-disable-next-line prefer-const
    let { type, inputmode, ...rest } = props

    if (type === 'decimal') {
      type = 'text'
      inputmode = 'decimal'
    } else if (type === 'number') {
      type = 'tel'
      inputmode = 'numeric'
    }

    const id = props.id ?? useId()

    return {
      ...omit(rest, ['pattern', 'modelValue', 'precision', 'max', 'min']),
      id,
      type,
      inputmode,
    }
  })

  const { handleCompositionstart, handleCompositionend } = useComposition()

  const handleBlur = (e: FocusEvent) => {
    const { type, modelValue } = props
    if (type === 'decimal') {
      if (modelValue === '-') {
        emit('update:model-value', '')
      } else if (modelValue?.toString()?.endsWith('.')) {
        const v = modelValue.toString()
        emit('update:model-value', v.substring(0, v.length - 1))
      }
    }
    emit('blur', e)
  }

  const handleInput = (e: InputEvent) => {
    const target = e.target as HTMLInputElement
    if ((target as any)?.composing) {
      return
    }

    const { type, precision, min, max, pattern, modelValue } = props
    let value = target.value

    if (type === 'number') {
      value = parseNumberString(value)
    } else if (type === 'decimal') {
      value = parseDecimalString(value, { precision: +precision, allowNegativeNumber: +min < 0 })

      if (+value < +min || +value > +max) {
        value = modelValue?.toString() ?? ''
      }
      // value = createDecimalPattern({ precision: +precision, allowNegativeNumber: +min < 0 })(
      //   value,
      //   modelValue?.toString() ?? '',
      // )
    }

    if (pattern) {
      value = pattern(value, isNumber(modelValue) ? modelValue.toString() : (modelValue ?? ''))
    }

    if (target.value !== value) {
      target.value = value
    }

    emit('update:model-value', value)
    emit('change', value)
  }
</script>
